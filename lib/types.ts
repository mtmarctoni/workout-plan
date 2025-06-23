import { Prisma } from '@prisma/client';

// User types
export type UserWithProfile = Prisma.UserGetPayload<{
  include: { profile: true };
}>;

// Exercise types
export type ExerciseWithDetails = Prisma.ExerciseGetPayload<{
  include: { workoutExercises: true };
}>;

// exercise interface for exercises in db using prisma
// export type Exercise = Prisma.ExerciseGetPayload<{}>; // No relations included

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
  level: string;
  equipment: string[];
  muscleGroups: string[];
  imageUrl: string | null;
  instructions: string[];
  hasHyperlaxityMod: boolean;
  hyperlaxityMod: string | null;
  defaultSets: number | null;
  defaultReps: string | null;
  type: string;
}

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

export type FilterOption = {
  value: string;
  label: string;
};

export type WorkoutExerciseWithDetails = {
  id: string;
  orderIndex: number;
  sets: number;
  reps: string;
  restSeconds: number;
  weight: number | null;
  notes: string | null;
  exercise: {
    id: string;
    name: string;
    description: string;
    category: string;
    type: string;
    level: string;
    instructions: string[];
    equipment: string[];
    muscleGroups: string[];
    hasHyperlaxityMod: boolean;
    hyperlaxityMod: string | null;
    videoUrl?: string;
  };
  workoutPlan: {
    id: string;
    name: string;
    phase: number;
    week: number;
    day: number;
    estimatedDuration: number;
    difficulty: string;
    focus: string;
  };
};

// Workout types
export interface TodayWorkout {
  id: string;
  name: string;
  phase: number;
  week: number;
  day: number;
  estimatedDuration: number;
  difficulty: string;
  focus: string; // Single string as per the Prisma schema
  currentSessionId?: string;
}

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