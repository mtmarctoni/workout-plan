'use server';

import { prisma } from '@/lib/db';

export async function getDashboardData(userId: string) {
  try {
    // Get user profile for current phase and week
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        currentPhase: true,
        currentWeek: true,
        availableDays: true,
        trainingGoals: true,
      },
    });

    if (!userProfile) {
      throw new Error('User profile not found');
    }

    // Get recent workout sessions
    const recentSessions = await prisma.workoutSession.findMany({
      where: {
        userId,
        status: 'COMPLETED',
      },
      orderBy: {
        startedAt: 'desc',
      },
      take: 5,
      include: {
        workoutPlan: true,
      },
    });

    // Get upcoming workout plans
    const upcomingWorkouts = await prisma.workoutPlan.findMany({
      where: {
        userId,
        OR: [
          { phase: userProfile.currentPhase, week: userProfile.currentWeek },
          { 
            phase: userProfile.currentPhase, 
            week: userProfile.currentWeek + 1,
          },
        ],
      },
      orderBy: [
        { week: 'asc' },
        { day: 'asc' },
      ],
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });


    // Calculate performance metrics from exercise logs
    // const exerciseLogs = await prisma.exerciseLog.findMany({
    //   where: {
    //     workoutSession: {
    //       userId,
    //       status: 'COMPLETED',
    //     },
    //   },
    //   include: {
    //     exercise: true,
    //     workoutSession: true,
    //   },
    //   orderBy: {
    //     workoutSession: {
    //       startedAt: 'asc',
    //     },
    //   },
    // });


    // Process performance data (simplified example - adjust based on your metrics)
    // const performanceData = exerciseLogs.reduce((acc, log) => {
    //   const week = log.workoutSession.startedAt.getWeek();
    //   const existingWeek = acc.find((item) => item.week === week);
      
    //   // This is a simplified example - you'll want to customize this based on your metrics
    //   const volume = log.weights.reduce((sum, weight, i) => {
    //     const reps = parseInt(log.repsCompleted[i] || '0');
    //     return sum + (weight * reps);
    //   }, 0);

    //   if (existingWeek) {
    //     existingWeek.volume += volume;
    //     existingWeek.workouts += 1;
    //   } else {
    //     acc.push({
    //       week,
    //       volume,
    //       workouts: 1,
    //     });
    //   }
      
    //   return acc;
    // }, [] as Array<{week: number, volume: number, workouts: number}>);

    return {
      userProfile,
      recentSessions: recentSessions.map(session => ({
        id: session.id,
        name: session.name,
        date: session.startedAt.toLocaleDateString(),
        duration: session.duration,
        status: session.status,
        workoutPlan: session.workoutPlan ? {
          name: session.workoutPlan.name,
          phase: session.workoutPlan.phase,
          week: session.workoutPlan.week,
        } : null,
      })),
      upcomingWorkouts: upcomingWorkouts.map(workout => ({
        id: workout.id,
        name: workout.name,
        type: workout.focus,
        phase: workout.phase,
        week: workout.week,
        day: workout.day,
        difficulty: workout.difficulty,
        exercises: workout.exercises.length,
        estimatedDuration: workout.estimatedDuration,
      })),
    //   performanceData,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
}

// Add getWeek method to Date prototype
declare global {
  interface Date {
    getWeek(): number;
  }
}

Date.prototype.getWeek = function() {
  const date = new Date(this);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};
