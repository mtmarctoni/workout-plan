"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';
import WorkoutHeader from './components/WorkoutHeader';
import CurrentExerciseCard from './components/CurrentExerciseCard';
import TimerCard from './components/TimerCard';
import SetTrackerCard from './components/SetTrackerCard';
import ExerciseNavigation from './components/ExerciseNavigation';
import QuickActionsCard from './components/QuickActionsCard';
import useWorkoutData from './hooks/useWorkoutData';
import { 
  completeExerciseSet, 
} from './actions';

export default function Workout() {
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [completedSets, setCompletedSets] = useState<Record<number, number>>({});
  const [restTime, setRestTime] = useState(45);
  const [isResting, setIsResting] = useState(false);
  
  const { isLoading, error, exercises, todayWorkout } = useWorkoutData();

  const handleCompleteSet = async () => {
    const newCompletedSets = { ...completedSets };
    const currentCount = newCompletedSets[currentExerciseIdx] || 0;
    newCompletedSets[currentExerciseIdx] = currentCount + 1;
    setCompletedSets(newCompletedSets);
    
    // Save to database if needed
    await completeExerciseSet(
      todayWorkout?.currentSessionId || '',
      exercises[currentExerciseIdx].id,
      currentCount + 1,
      [],
      [],
      []
    );
  };

  const handleNextExercise = () => {
    if (currentExerciseIdx < exercises.length - 1) {
      setCurrentExerciseIdx(prev => prev + 1);
      setIsResting(true);
      setIsActive(true);
      setRestTime(45);
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIdx > 0) {
      setCurrentExerciseIdx(prev => prev - 1);
    }
  };

  const handleTimerComplete = () => {
    // Play a sound or show a notification
    if (typeof window !== 'undefined' && window.Notification?.permission === 'granted') {
      new Notification('Rest time is over!');
    }
  
    // Or play a beep sound
    const audio = new Audio('/sounds/beep.mp3'); // Make sure to have a beep.mp3 in your public folder
    audio.play().catch(e => console.log('Audio play failed:', e));
  
    // Or automatically move to the next exercise
    // handleNextExercise();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading workout data...</span>
      </div>
    );
  }

  if (error || !todayWorkout || exercises.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Error loading workout</h3>
            <p className="text-gray-600 mb-6">
              {error || "No workout data available"}
            </p>
            <Button variant="secondary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIdx];

  // Prepare props for CurrentExerciseCard
  const exerciseProps = {
    exercise: currentExercise,
    completedSets,
    currentExerciseIdx,
    numOfExercises: exercises.length,
    exerciseVideoUrl: currentExercise.exercise.videoUrl || '',
    exerciseName: currentExercise.exercise.name,
    exerciseSets: currentExercise.sets || 0,
    exerciseReps: currentExercise.reps || '8-12',
    exerciseRestSeconds: currentExercise.restSeconds || 60,
    exerciseEquipment: currentExercise.exercise.equipment,
    exerciseInstructions: currentExercise.exercise.instructions,
    hasHyperlaxityMod: currentExercise.exercise.hasHyperlaxityMod,
    hyperlaxityMod: currentExercise.exercise.hyperlaxityMod || ''
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <WorkoutHeader 
        todayWorkout={todayWorkout} 
        currentExerciseIdx={currentExerciseIdx}
        exercises={exercises}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CurrentExerciseCard {...exerciseProps} />

        <div className="space-y-6">
          <TimerCard
          initialTime={currentExercise.restSeconds || 60}
           onTimerComplete={handleTimerComplete}
          />
          
          <SetTrackerCard 
            exercise={currentExercise}
            completedSets={completedSets}
            currentExerciseIdx={currentExerciseIdx}
            handleCompleteSet={handleCompleteSet}
          />
          
          <ExerciseNavigation 
            currentExerciseIdx={currentExerciseIdx}
            numOfExercises={exercises.length}
            handlePreviousExercise={handlePreviousExercise}
            handleNextExercise={handleNextExercise}
          />
          
          <QuickActionsCard />
        </div>
      </div>
    </div>
  );
}
