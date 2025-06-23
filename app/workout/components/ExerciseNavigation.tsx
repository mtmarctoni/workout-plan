import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ExerciseNavigationProps {
  currentExerciseIdx: number;
  numOfExercises: number;
  handlePreviousExercise: () => void;
  handleNextExercise: () => void;
}

export default function ExerciseNavigation({
  currentExerciseIdx,
  numOfExercises,
  handlePreviousExercise,
  handleNextExercise,
}: ExerciseNavigationProps) {
  return (
    <div className="flex justify-between items-center">
      <Button
        onClick={handlePreviousExercise}
        disabled={currentExerciseIdx === 0}
        variant="outline"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>
      <span>
        {currentExerciseIdx + 1} / {numOfExercises}
      </span>
      <Button
        onClick={handleNextExercise}
        disabled={currentExerciseIdx === numOfExercises - 1}
        variant="outline"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
