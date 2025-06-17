import { Prisma } from '@prisma/client';

// User types
export type UserWithProfile = Prisma.UserGetPayload<{
  include: { profile: true };
}>;

// Exercise types
export type ExerciseWithDetails = Prisma.ExerciseGetPayload<{
  include: { workoutExercises: true };
}>;

// Workout types
export type WorkoutPlanWithExercises = Prisma.WorkoutPlanGetPayload<{
  include: {
    exercises: {
      include: {
        exercise: true;
      };
    };
  };
}>;

export type WorkoutSessionWithLogs = Prisma.WorkoutSessionGetPayload<{
  include: {
    exerciseLogs: {
      include: {
        exercise: true;
      };
    };
    workoutPlan: {
      include: {
        exercises: {
          include: {
            exercise: true;
          };
        };
      };
    };
  };
}>;

// Progress types
export type ProgressWithHistory = Prisma.ProgressEntryGetPayload<{
  include: { user: true };
}>;

// Enums
export enum ExerciseCategory {
  UPPER_POWER = 'UPPER_POWER',
  LOWER_POWER = 'LOWER_POWER',
  CORE_POWER = 'CORE_POWER',
  AGILITY = 'AGILITY',
  STRENGTH = 'STRENGTH',
  RECOVERY = 'RECOVERY',
}

export enum ExerciseType {
  POWER = 'POWER',
  STRENGTH = 'STRENGTH',
  AGILITY = 'AGILITY',
  RECOVERY = 'RECOVERY',
  COMPETITION = 'COMPETITION',
}

export enum ExperienceLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum WorkoutStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum AchievementType {
  PERFORMANCE = 'PERFORMANCE',
  CONSISTENCY = 'CONSISTENCY',
  MILESTONE = 'MILESTONE',
}