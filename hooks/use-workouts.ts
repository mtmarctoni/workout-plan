import { useState, useEffect } from 'react';
import { WorkoutPlanWithExercises } from '@/lib/types';

interface UseWorkoutsOptions {
  userId: string;
  phase?: number;
  week?: number;
}

export function useWorkouts(options: UseWorkoutsOptions) {
  const [workouts, setWorkouts] = useState<WorkoutPlanWithExercises[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        params.append('userId', options.userId);
        if (options.phase) params.append('phase', options.phase.toString());
        if (options.week) params.append('week', options.week.toString());

        const response = await fetch(`/api/workouts?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const data = await response.json();
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (options.userId) {
      fetchWorkouts();
    }
  }, [options.userId, options.phase, options.week]);

  return { workouts, loading, error };
}