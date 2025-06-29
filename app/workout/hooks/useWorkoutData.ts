import { useState, useEffect } from 'react';
import { 
  getCurrentUserWorkout,
  createOrResumeWorkoutSession
} from '../actions';
import { TodayWorkout, WorkoutExerciseWithDetails, Exercise } from '@/lib/types';

export default function useWorkoutData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exercises, setExercises] = useState<WorkoutExerciseWithDetails[]>([]);
  const [todayWorkout, setTodayWorkout] = useState<TodayWorkout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const userId = 'user1'; // Replace with actual user ID
        const { data: workoutPlanWithExercises, error: workoutError } = 
          await getCurrentUserWorkout(userId);
        
        if (workoutError || !workoutPlanWithExercises) {
          throw new Error(workoutError || 'No workout plan found');
        }
        
        const { id, name, phase, week, day, estimatedDuration, difficulty, focus, exercises } = 
          workoutPlanWithExercises;
        
        setTodayWorkout({
          id,
          name,
          phase,
          week,
          day,
          estimatedDuration,
          difficulty,
          focus,
          currentSessionId: workoutPlanWithExercises.currentSessionId
        });
        
        setExercises(exercises || []);
        
        if (!workoutPlanWithExercises.currentSessionId) {
          const { data: session } = await createOrResumeWorkoutSession(id, userId);
          if (session) {
            setTodayWorkout(prev => ({
              ...prev!,
              currentSessionId: session.id
            }));
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workout data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return { isLoading, error, exercises, todayWorkout };
}
