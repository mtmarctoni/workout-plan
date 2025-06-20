import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, Target } from 'lucide-react';
import { TodayWorkout } from '@/lib/types';

export default function WorkoutHeader({ 
  todayWorkout,
  currentExerciseIdx,
  exercises 
}: {
  todayWorkout: TodayWorkout;
  currentExerciseIdx: number;
  exercises: any[];
}) {
  const workoutProgress = exercises.length > 0 
    ? ((currentExerciseIdx + 1) / exercises.length) * 100 
    : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Badge className="bg-orange-100 text-orange-800">
          Phase {todayWorkout.phase || 'N/A'}
        </Badge>
        <Badge variant="outline">
          Week {todayWorkout.week} • Day {todayWorkout.day}
        </Badge>
      </div>
      <h1 className="text-3xl font-bold mb-2">{todayWorkout.name}</h1>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Timer className="w-4 h-4" />
          {todayWorkout.estimatedDuration} min
        </span>
        <span className="flex items-center gap-1">
          <Target className="w-4 h-4" />
          {exercises.length} exercises
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Workout Progress</span>
          <span className="text-sm text-gray-600">
            {currentExerciseIdx + 1} of {exercises.length}
          </span>
        </div>
        <Progress value={workoutProgress} className="h-2" />
      </div>
    </div>
  );
}
