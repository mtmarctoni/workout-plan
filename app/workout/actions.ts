'use server';

import { ExerciseLog, Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { WorkoutExerciseWithDetails } from '@/lib/types';

type WorkoutPlan = Prisma.WorkoutPlanGetPayload<{
  include: {
    exercises: {
      include: {
        exercise: true;
      };
    };
  };
}>;

type GetWorkoutExercisesOptions = {
  workoutPlanId?: string;
  userId?: string;
  includeExerciseDetails?: boolean;
};

export async function getWorkoutExercises(options: GetWorkoutExercisesOptions = {}) {
  const { workoutPlanId, userId } = options;
  
  try {
    if (!workoutPlanId && !userId) {
      throw new Error('Either workoutPlanId or userId must be provided');
    }
    
    const where: any = {};
    
    if (workoutPlanId) {
      where.workoutPlanId = workoutPlanId;
    }
    
    if (userId) {
      where.workoutPlan = { userId };
    }
    
    const workoutExercises = await prisma.workoutExercise.findMany({
      where,
      include: {
        exercise: {
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            type: true,
            level: true,
            instructions: true,
            equipment: true,
            muscleGroups: true,
            hasHyperlaxityMod: true,
            hyperlaxityMod: true,
          }
        },
        workoutPlan: {
          select: {
            id: true,
            name: true,
            phase: true,
            week: true,
            day: true,
            estimatedDuration: true,
            difficulty: true,
            focus: true,
          }
        }
      },
      orderBy: [
        { workoutPlan: { phase: 'asc' } },
        { workoutPlan: { week: 'asc' } },
        { workoutPlan: { day: 'asc' } },
        { orderIndex: 'asc' }
      ]
    }) as unknown as WorkoutExerciseWithDetails[];

    return { data: workoutExercises, error: null };
  } catch (error) {
    console.error('Error fetching workout exercises:', error);
    return { data: [], error: 'Failed to fetch workout exercises' };
  }
}

export interface WorkoutPlanWithExercisesAndSession extends Omit<WorkoutPlan, 'exercises'> {
  exercises: Array<WorkoutExerciseWithDetails & { completed?: boolean }>;
  currentSessionId?: string;
}

export async function getWorkoutPlanById(
  id: string, 
  userId: string
): Promise<{ data: WorkoutPlanWithExercisesAndSession | null; error: string | null }> {
  try {
    console.log('getWorkoutPlanById', id, userId);

    // Get the most recent workout session for this plan and user
    const latestSession = await prisma.workoutSession.findFirst({
      where: {
        workoutPlanId: id,
        userId,
        status: 'IN_PROGRESS'
      },
      orderBy: {
        startedAt: 'desc'
      },
      // include: {
      //   exerciseLogs: true
      // }
    });

    const workoutPlan = await prisma.workoutPlan.findUnique({
      where: { id },
      include: {
        exercises: {
          include: {
            exercise: true
          },
          orderBy: {
            orderIndex: 'asc'
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!workoutPlan) {
      return { data: null, error: 'Workout plan not found' };
    }

    // Enhance exercises with completion status
    const exercisesWithStatus = workoutPlan.exercises.map(exercise => {
      // const exerciseLog = latestSession?.exerciseLogs.find(
      //   log => log.exerciseId === exercise.exerciseId
      // );
      
      // Create a properly typed exercise with completion status
      const exerciseWithStatus: WorkoutExerciseWithDetails & { completed: boolean } = {
        ...exercise,
        exercise: {
          id: exercise.exercise.id,
          name: exercise.exercise.name,
          description: exercise.exercise.description,
          category: exercise.exercise.category,
          type: exercise.exercise.type,
          level: exercise.exercise.level,
          instructions: exercise.exercise.instructions,
          equipment: exercise.exercise.equipment,
          muscleGroups: exercise.exercise.muscleGroups,
          hasHyperlaxityMod: exercise.exercise.hasHyperlaxityMod,
          hyperlaxityMod: exercise.exercise.hyperlaxityMod,
          videoUrl: (exercise.exercise as any).videoUrl, // Add videoUrl if it exists
        },
        workoutPlan: {
          id: workoutPlan.id,
          name: workoutPlan.name,
          phase: workoutPlan.phase,
          week: workoutPlan.week,
          day: workoutPlan.day,
          estimatedDuration: workoutPlan.estimatedDuration,
          difficulty: workoutPlan.difficulty,
          focus: workoutPlan.focus,
        },
        // completed: !!exerciseLog && exerciseLog.setsCompleted >= exercise.sets
        completed: false
      };
      
      return exerciseWithStatus;
    });

    const result: WorkoutPlanWithExercisesAndSession = {
      ...workoutPlan,
      exercises: exercisesWithStatus,
    };

    if (latestSession?.id) {
      result.currentSessionId = latestSession.id;
    }

    return { 
      data: result, 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching workout plan:', error);
    return { data: null, error: 'Failed to fetch workout plan' };
  }
}

export async function createOrResumeWorkoutSession(workoutPlanId: string, userId: string) {
  try {
    console.log('createOrResumeWorkoutSession', workoutPlanId, userId);
    // Check for existing in-progress session
    const existingSession = await prisma.workoutSession.findFirst({
      where: {
        workoutPlanId,
        userId,
        status: 'IN_PROGRESS'
      },
      orderBy: {
        startedAt: 'desc'
      }
    });

    if (existingSession) {
      return { data: existingSession, error: null };
    }

    // Create a new session
    const newSession = await prisma.workoutSession.create({
      data: {
        userId,
        workoutPlanId,
        name: `Workout - ${new Date().toLocaleDateString()}`,
        startedAt: new Date(),
        status: 'IN_PROGRESS'
      }
    });

    return { data: newSession, error: null };
  } catch (error) {
    console.error('Error creating/resuming workout session:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Failed to create/resume workout session' 
    };
  }
}

export async function completeWorkoutSession(sessionId: string) {
  try {
    const session = await prisma.workoutSession.update({
      where: { id: sessionId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date()
      },
      // include: {
      //   exerciseLogs: true
      // }
    });

    return { data: session, error: null };
  } catch (error) {
    console.error('Error completing workout session:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Failed to complete workout session' 
    };
  }
}

export async function getCurrentUserWorkout(userId: string) {
  try {
    // First, check if there's a workout session in progress
    const activeSession = await prisma.workoutSession.findFirst({
      where: { 
        userId,
        status: 'IN_PROGRESS'
      },
      orderBy: { startedAt: 'desc' },
      include: {
        workoutPlan: true
      }
    });

    // If we have an active session, return its workout plan
    if (activeSession?.workoutPlanId) {
      const { data: workoutPlan, error } = await getWorkoutPlanById(activeSession.workoutPlanId, userId);
      if (!error && workoutPlan) {
        return { data: { ...workoutPlan, currentSessionId: activeSession.id }, error: null };
      }
    }

    // If no active session, get the next workout plan
    const nextWorkoutPlan = await prisma.workoutPlan.findFirst({
      where: { 
        userId,
        // Only get plans that don't have a completed session today
        sessions: {
          none: {
            status: 'COMPLETED',
            startedAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(23, 59, 59, 999))
            }
          }
        }
      },
      orderBy: [{ phase: 'asc' }, { week: 'asc' }, { day: 'asc' }],
      take: 1
    });

    if (!nextWorkoutPlan) {
      // If no next plan, return the latest completed plan
      const latestWorkoutPlan = await prisma.workoutPlan.findFirst({
        where: { userId },
        orderBy: [{ phase: 'desc' }, { week: 'desc' }, { day: 'desc' }],
        take: 1
      });
      
      if (!latestWorkoutPlan) {
        return { data: null, error: 'No workout plan found' };
      }
      
      const { data: workoutPlan, error } = await getWorkoutPlanById(latestWorkoutPlan.id, userId);
      return { data: workoutPlan, error };
    }

    // Get the exercises for the next workout plan
    const { data: workoutPlan, error } = await getWorkoutPlanById(nextWorkoutPlan.id, userId);
    
    if (error) {
      return { data: null, error };
    }

    return {
      data: workoutPlan,
      error: null
    };
  } catch (error) {
    console.error('Error fetching current workout:', error);
    return { data: null, error: 'Failed to fetch current workout' };
  }
}
