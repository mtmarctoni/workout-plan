import { useState, useEffect } from 'react';
import { ExerciseWithDetails } from '@/lib/types';

interface UseExercisesOptions {
  category?: string;
  level?: string;
  equipment?: string;
  search?: string;
}

export function useExercises(options: UseExercisesOptions = {}) {
  const [exercises, setExercises] = useState<ExerciseWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (options.category) params.append('category', options.category);
        if (options.level) params.append('level', options.level);
        if (options.equipment) params.append('equipment', options.equipment);
        if (options.search) params.append('search', options.search);

        const response = await fetch(`/api/exercises?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch exercises');
        }

        const data = await response.json();
        setExercises(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [options.category, options.level, options.equipment, options.search]);

  return { exercises, loading, error };
}