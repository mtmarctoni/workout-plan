import { WorkoutStatus } from './actions';

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  sets: number;
  reps: string;
  restTime: number | null;
  videoUrl: string | null;
}

export interface WorkoutDay {
  id: string;
  name: string;
  description: string | null;
  type: string;
  status: WorkoutStatus;
  duration: number;
  exercisesCount: number;
  completedExercises?: number;
  startTime?: string | null;
  phase: number;
  week: number;
  day: number;
  exercises: Exercise[];
}

export interface ScheduleWeek {
  id: string;
  startDate: string;
  endDate: string;
  weekNumber: number;
  workouts: WorkoutDay[];
}

export interface Stats {
  totalWorkouts: number;
  completed: number;
  scheduled: number;
  inProgress: number;
  totalDuration: number;
}

export interface PhaseWeeks {
  [phase: number]: number[];
}
