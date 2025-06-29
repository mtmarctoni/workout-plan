import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Exercise, WorkoutExerciseWithDetails } from '@/lib/types';

interface SetTrackerCardProps {
  exercise: WorkoutExerciseWithDetails;
  completedSets: Record<number, number>;
  currentExerciseIdx: number;
  handleCompleteSet: () => void;
}

export default function SetTrackerCard({
  exercise,
  completedSets,
  currentExerciseIdx,
  handleCompleteSet,
}: SetTrackerCardProps) {
  const sets = exercise.sets || 0;
  const completed = completedSets[currentExerciseIdx] || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Set Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <span className="text-lg font-mono">
            {completed} / {sets} sets completed
          </span>
          <button
  className={`px-4 py-2 rounded transition ${
    completed >= sets
      ? "bg-gray-200 text-gray-600 cursor-default"
      : "bg-green-600 text-white hover:bg-green-700"
  }`}
  onClick={completed >= sets ? undefined : handleCompleteSet}
>
  {completed >= sets ? (
    <span className="flex items-center gap-1">
      <CheckCircle className="w-4 h-4" />
      Completed
    </span>
  ) : (
    "Mark Set Complete"
  )}
</button>
          {/* <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={handleCompleteSet}
            disabled={completed >= sets}
          >
            Mark Set Complete
          </button> */}
        </div>
      </CardContent>
    </Card>
  );
}
