'use server';

import { prisma } from '@/lib/db';
import { createOrResumeWorkoutSession } from '../workout/actions';

export type WorkoutStatus = 'scheduled' | 'completed' | 'in-progress';

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  sets: number;
  reps: string;
  restTime: number | null;
  videoUrl: string | null;
}

export interface ScheduleWorkout {
  id: string;
  name: string;
  description: string | null;
  day: number; // 1-7 (Monday-Sunday)
  phase: number;
  week: number;
  type: string;
  status: WorkoutStatus;
  duration: number;
  exercisesCount: number;
  completedExercises?: number;
  startTime?: string | null;
  exercises: Exercise[];
}

export interface ScheduleWeek {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  workouts: ScheduleWorkout[];
}

// Helper function to map status string to WorkoutStatus
export async function toWorkoutStatus(status: string): Promise<WorkoutStatus> {
  if (status === 'completed' || status === 'in-progress') {
    return status;
  }
  return 'scheduled';
}

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  sets: number;
  reps: string;
  restTime: number | null;
  videoUrl: string | null;
}

export interface ScheduleWorkout {
  id: string;
  name: string;
  description: string | null;
  day: number; // 1-7 (Monday-Sunday)
  phase: number;
  week: number;
  type: string;
  status: WorkoutStatus;
  duration: number;
  exercisesCount: number;
  completedExercises?: number;
  startTime?: string | null;
  exercises: Exercise[];
}

export async function getScheduleForWeek(userId: string, phase: number, week: number): Promise<{ data: ScheduleWeek | null; error: string | null }> {
  try {
    // Get the user's profile to determine available days and other preferences
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        availableDays: true,
        programStartDate: true,
      },
    });

    if (!userProfile) {
      return { data: null, error: 'User profile not found' };
    }

    // Calculate the start and end dates for the requested week
    // This is a simplified calculation - you might want to adjust based on your program's logic
    const programStartDate = userProfile.programStartDate || new Date();
    const weekStartDate = new Date(programStartDate);
    weekStartDate.setDate(programStartDate.getDate() + ((phase - 1) * 21 + (week - 1) * 7)); // 3 weeks per phase
    
    // Set to Monday of the target week
    const dayOfWeek = weekStartDate.getDay() || 7; // Convert Sunday (0) to 7
    weekStartDate.setDate(weekStartDate.getDate() - (dayOfWeek - 1));
    
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);

    // Get all workout plans for the specified phase and week
    const workoutPlans = await prisma.workoutPlan.findMany({
      where: {
        userId,
        phase,
        week,
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
        sessions: {
          where: {
            status: 'COMPLETED',
          },
          orderBy: {
            startedAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: [
        { day: 'asc' },
      ],
    });

    // Get the most recent session for each workout plan to determine status
    const recentSessions = await prisma.workoutSession.findMany({
      where: {
        userId,
        workoutPlanId: {
          in: workoutPlans.map(wp => wp.id),
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
      distinct: ['workoutPlanId'],
    });

    // Map workout plans to the schedule format
    const workouts = await Promise.all(workoutPlans.map(async (plan) => {
      const recentSession = recentSessions.find(s => s.workoutPlanId === plan.id);
      const isCompleted = recentSession?.status === 'COMPLETED';
      const isInProgress = recentSession?.status === 'IN_PROGRESS';
      
      // Get exercise details
      const exercises = plan.exercises.map(exercise => ({
        id: exercise.exercise.id,
        name: exercise.exercise.name,
        description: exercise.exercise.description,
        sets: exercise.sets,
        reps: exercise.reps,
        restTime: exercise.restSeconds || null, // Using restSeconds from Prisma schema
        videoUrl: exercise.exercise.videoUrl
      }));
      
      return {
        id: plan.id,
        name: plan.name,
        description: plan.description || null,
        day: plan.day,
        phase: plan.phase,
        week: plan.week,
        type: plan.focus || 'Workout',
        status: await toWorkoutStatus(isCompleted ? 'completed' : isInProgress ? 'in-progress' : 'scheduled'),
        duration: plan.estimatedDuration,
        exercisesCount: plan.exercises.length,
        completedExercises: isCompleted ? plan.exercises.length : 0,
        exercises
      };
    }));

    // Add empty days for the schedule
    const weekDays = [1, 2, 3, 4, 5, 6, 7];
    const scheduleWorkouts = await Promise.all(weekDays.map(async day => {
      const existingWorkout = workouts.find(w => w.day === day);
      if (existingWorkout) return existingWorkout;
      
      // Return a placeholder for days without workouts
      return {
        id: `rest-day-${day}`,
        name: 'Rest Day',
        description: null,
        day,
        phase,
        week,
        type: 'Rest',
        status: 'scheduled' as const,
        duration: 0,
        exercisesCount: 0,
        exercises: [],
        startTime: null
      };
    }));

    return {
      data: {
        weekNumber: week,
        startDate: weekStartDate,
        endDate: weekEndDate,
        workouts: scheduleWorkouts,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    throw new Error('Failed to fetch schedule data');
  }
};

// Action to start a workout
export const startWorkout = async (workoutPlanId: string, userId: string) => {
  try {
    const result = await createOrResumeWorkoutSession(workoutPlanId, userId);
    
    if (result.error) {
      console.error('Error starting workout:', result.error);
      throw new Error(result.error);
    }
    
    return { success: true, sessionId: result.data?.id };
  } catch (error) {
    console.error('Error in startWorkout:', error);
    throw error;
  }
};

export async function getCurrentWeekSchedule(userId: string) {
  try {
    // Get user's current phase and week
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        currentPhase: true,
        currentWeek: true,
      },
    });

    if (!userProfile) {
      return { data: null, error: 'User profile not found' };
    }

    return getScheduleForWeek(userId, userProfile.currentPhase, userProfile.currentWeek);
  } catch (error) {
    console.error('Error getting current week schedule:', error);
    return { data: null, error: 'Failed to get current week schedule' };
  }
}

export async function getPhasesAndWeeks(userId: string) {
  try {
    // Get all unique phase and week combinations for the user
    const workouts = await prisma.workoutPlan.findMany({
      where: { userId },
      distinct: ['phase', 'week'],
      select: {
        phase: true,
        week: true,
      },
      orderBy: [
        { phase: 'asc' },
        { week: 'asc' },
      ],
    });

    // Group by phase
    const phases = workouts.reduce<Record<number, number[]>>((acc, { phase, week }) => {
      if (!acc[phase]) {
        acc[phase] = [];
      }
      if (!acc[phase].includes(week)) {
        acc[phase].push(week);
      }
      return acc;
    }, {});

    return { data: phases, error: null };
  } catch (error) {
    console.error('Error getting phases and weeks:', error);
    return { data: null, error: 'Failed to get phases and weeks' };
  }
}
