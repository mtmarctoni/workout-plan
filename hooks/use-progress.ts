import { useState, useEffect } from 'react';
import { ProgressWithHistory } from '@/lib/types';

export function useProgress(userId: string) {
  const [progress, setProgress] = useState<ProgressWithHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/progress?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch progress');
        }

        const data = await response.json();
        setProgress(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProgress();
    }
  }, [userId]);

  const addProgressEntry = async (entry: Partial<ProgressWithHistory>) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...entry, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add progress entry');
      }

      const newEntry = await response.json();
      setProgress(prev => [...prev, newEntry]);
      return newEntry;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return { progress, loading, error, addProgressEntry };
}