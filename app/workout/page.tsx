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
  completeWorkoutSession, 
  getCurrentUserWorkout,
  WorkoutPlanWithExercisesAndSession 
} from './actions';
import { WorkoutOverviewCard } from './components/WorkoutOverviewCard';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Workout() {
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [completedSets, setCompletedSets] = useState<Record<number, number>>({});
  const [restTime, setRestTime] = useState(45);
  const [isResting, setIsResting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [nextWorkout, setNextWorkout] = useState<WorkoutPlanWithExercisesAndSession | null>(null);
  const router = useRouter();
  
  const { isLoading, error, exercises, todayWorkout } = useWorkoutData();
  const userId = 'user1'; // Using the same hardcoded user ID as in useWorkoutData

  const handleCompleteSet = async () => {
    const newCompletedSets = { ...completedSets };
    const currentCount = newCompletedSets[currentExerciseIdx] || 0;
    newCompletedSets[currentExerciseIdx] = currentCount + 1;
    setCompletedSets(newCompletedSets);
    
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

  const handleCompleteWorkout = async () => {
    if (!todayWorkout?.currentSessionId) return;
    
    try {
      setIsCompleting(true);
      const result = await completeWorkoutSession(todayWorkout.currentSessionId);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      // Get next workout
      if (userId) {
        const nextWorkoutResult = await getCurrentUserWorkout(userId);
        if (nextWorkoutResult.data) {
          setNextWorkout(nextWorkoutResult.data);
        }
      }
      
      toast.success('Workout completed successfully!');
    } catch (error) {
      console.error('Error completing workout:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete workout';
      toast.error(errorMessage);
    } finally {
      setIsCompleting(false);
    }
  };

  if (nextWorkout) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Workout Completed!</h3>
            <p className="text-gray-600 mb-6">
              Great job! Your next workout is ready.
            </p>
            <div className="space-y-4">
              <Button onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
              {nextWorkout.exercises && nextWorkout.exercises.length > 0 && (
                <Button variant="outline" onClick={() => window.location.reload()}>
                  View Next Workout
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
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
    <div className="container mx-auto px-4 py-8 space-y-8">

      <WorkoutHeader 
        todayWorkout={todayWorkout} 
        currentExerciseIdx={currentExerciseIdx}
        exercises={exercises}
        />
        
        {/* Workout Overview */}
        {todayWorkout && (
          <WorkoutOverviewCard
            exercises={exercises.map(ex => ({
              id: ex.exercise.id,
              name: ex.exercise.name,
              description: ex.exercise.description,
              equipment: ex.exercise.equipment,
              instructions: ex.exercise.instructions,
              category: ex.exercise.category,
              type: ex.exercise.type,
              defaultSets: ex.sets,
              defaultReps: ex.reps,
              defaultRestSeconds: ex.restSeconds
            }))}
            focus={todayWorkout.focus || ''}
          />
        )}

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
          
          <div className="space-y-4">
            <QuickActionsCard />
            <Button 
              onClick={handleCompleteWorkout} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isCompleting}
            >
              {isCompleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Completing...
                </>
              ) : (
                'Complete Workout'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
