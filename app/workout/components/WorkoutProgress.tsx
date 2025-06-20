import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface WorkoutProgressProps {
  currentExerciseIdx: number;
  exercisesLength: number;
}

export default function WorkoutProgress({
  currentExerciseIdx,
  exercisesLength,
}: WorkoutProgressProps) {
  const progress = exercisesLength > 0
    ? ((currentExerciseIdx + 1) / exercisesLength) * 100
    : 0;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Workout Progress</span>
        <Badge variant="outline">
          {currentExerciseIdx + 1} / {exercisesLength}
        </Badge>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
