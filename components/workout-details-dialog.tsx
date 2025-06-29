'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  sets: number;
  reps: string;
  restTime: number | null;
  videoUrl: string | null;
}

export interface WorkoutDetails {
  id: string;
  name: string;
  description: string | null;
  type: string;
  duration: number;
  exercises: Exercise[];
  exercisesCount: number;
  completedExercises?: number;
  phase: number;
  week: number;
  day: number;
  status: 'scheduled' | 'completed' | 'in-progress';
  startTime?: string | null;
}

interface WorkoutDetailsDialogProps {
  workout: WorkoutDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function WorkoutDetailsDialog({ workout, isOpen, onClose }: WorkoutDetailsDialogProps) {
  if (!workout) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl">{workout.name}</DialogTitle>
          <DialogDescription>
            {workout.description || `Details for ${workout.name} workout`}
          </DialogDescription>
          <div className="flex gap-4 text-sm text-muted-foreground pt-2">
            <span>Type: {workout.type}</span>
            {workout.duration && (
              <span>Duration: {workout.duration} min</span>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 -mr-4">
          <div className="space-y-6 py-4">
            <h3 className="font-medium">Exercises</h3>
            <div className="space-y-4">
              {workout.exercises.map((exercise, index) => (
                <div key={exercise.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        {index + 1}. {exercise.name}
                      </h4>
                      <div className="text-sm text-muted-foreground mt-1">
                        {exercise.sets} sets × {exercise.reps}
                        {exercise.restTime && ` • ${exercise.restTime}s rest`}
                      </div>
                      {exercise.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {exercise.description}
                        </p>
                      )}
                    </div>
                    {exercise.videoUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="ml-4"
                        onClick={() => window.open(exercise.videoUrl!, '_blank')}
                      >
                        Watch
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
