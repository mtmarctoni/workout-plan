"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, addWeeks, addDays, startOfWeek, nextMonday } from 'date-fns';
import { DatePickerWithPresets } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  getScheduleForWeek, 
  getCurrentWeekSchedule, 
  getPhasesAndWeeks, 
  startWorkout,
  type ScheduleWeek
} from './actions';
import { 
  ScheduleHeader,
  StatsGrid,
  WeekNavigator,
  WorkoutCard,
} from './components';
import type { Stats, PhaseWeeks } from './types';

export default function Schedule() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingWorkout, setIsStartingWorkout] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleWeek | null>(null);
  const [phases, setPhases] = useState<PhaseWeeks>({});
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [isNavigating, setIsNavigating] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(nextMonday(new Date()));
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const userId = 'user1';

  // Calculate week start and end dates based on start date and week number
  const getWeekDates = useCallback((weekNumber: number): { startDate: Date; endDate: Date } => {
    if (!startDate) {
      const now = new Date();
      return {
        startDate: now,
        endDate: addDays(now, 6)
      };
    }
    
    const weekStart = addWeeks(startDate, weekNumber - 1);
    const weekEnd = addDays(weekStart, 6);
    
    return {
      startDate: weekStart,
      endDate: weekEnd
    };
  }, [startDate]);

  // Fetch schedule data
  const fetchSchedule = async (phase: number, week: number) => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const { data } = await getScheduleForWeek(userId, phase, week);
      if (data) {
        const { startDate: weekStart, endDate: weekEnd } = getWeekDates(week);
        setSchedule({
          ...data,
          startDate: weekStart,
          endDate: weekEnd
        });
      }
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
      toast.error('Failed to load schedule');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch phases and weeks
  const fetchPhasesAndWeeks = async () => {
    if (!userId) return;
    
    try {
      const { data } = await getPhasesAndWeeks(userId);
      if (data) {
        setPhases(data);
        // Set the current phase and week as default regarding the current date
        const currentPhase = Math.min(...Object.keys(data).map(Number));
        const currentWeek = Math.min(...data[currentPhase]);
        setSelectedPhase(currentPhase);
        setSelectedWeek(currentWeek);
        await fetchSchedule(currentPhase, currentWeek);
      }
    } catch (error) {
      console.error('Failed to fetch phases and weeks:', error);
      toast.error('Failed to load training phases');
    }
  };

  // Handle start date change
  const handleStartDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    // Ensure the date is a Monday
    const monday = startOfWeek(date, { weekStartsOn: 1 });
    setStartDate(monday);
    setIsDatePickerOpen(false);
    
    // Refresh the schedule with the new start date
    fetchSchedule(selectedPhase, selectedWeek);
  };

  // Load current week's schedule
  const loadCurrentWeek = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const { data } = await getCurrentWeekSchedule(userId);
      if (data) {
        const { startDate: weekStart, endDate: weekEnd } = getWeekDates(selectedWeek);
        setSchedule({
          ...data,
          startDate: weekStart,
          endDate: weekEnd
        });
        setSelectedPhase(data.workouts[0]?.phase || 1);
        setSelectedWeek(data.weekNumber);
      }
    } catch (error) {
      console.error('Failed to fetch current week:', error);
      toast.error('Failed to load current week');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPhasesAndWeeks();
  }, []);

  // Handle week navigation
  const handleWeekChange = async (direction: 'prev' | 'next') => {
    if (!phases[selectedPhase]) return;
    
    let newWeek = selectedWeek;
    let newPhase = selectedPhase;
    
    if (direction === 'prev') {
      if (newWeek > 1) {
        newWeek--;
      } else if (newPhase > 1) {
        newPhase--;
        newWeek = Math.max(...phases[newPhase]);
      } else {
        return; // Already at the first week of the first phase
      }
    } else {
      if (newWeek < Math.max(...phases[newPhase])) {
        newWeek++;
      } else if (newPhase < Object.keys(phases).length) {
        newPhase++;
        newWeek = 1;
      } else {
        return; // Already at the last week of the last phase
      }
    }
    
    setIsNavigating(true);
    setSelectedPhase(newPhase);
    setSelectedWeek(newWeek);
    await fetchSchedule(newPhase, newWeek);
    setIsNavigating(false);
  };

  // Handle phase change
  const handlePhaseChange = (phase: number) => {
    setSelectedPhase(phase);
    setSelectedWeek(phases[phase]?.[0] || 1);
  };

  // Handle week select
  const handleWeekSelect = (week: number) => {
    setSelectedWeek(week);
  };

  // Calculate statistics for the week
  const stats: Stats = {
    totalWorkouts: schedule?.workouts.filter(w => w.type !== 'Rest').length || 0,
    completed: schedule?.workouts.filter(w => w.status === 'completed').length || 0,
    scheduled: schedule?.workouts.filter(w => w.status === 'scheduled').length || 0,
    inProgress: schedule?.workouts.filter(w => w.status === 'in-progress').length || 0,
    totalDuration: schedule?.workouts.reduce((sum, w) => sum + (w.duration || 0), 0) || 0,
  };

  // Handle starting a workout
  const handleStartWorkout = async (workoutId: string) => {
    if (!workoutId || !userId) return;
    
    setIsStartingWorkout(true);
    try {
      const result = await startWorkout(workoutId, userId);
      
      if (result?.success) {
        toast.success('Workout started!');
        // Navigate to the workout page
        router.push(`/workout?sessionId=${result.sessionId}`);
      } else {
        throw new Error('Failed to start workout');
      }
    } catch (error) {
      console.error('Error starting workout:', error);
      toast.error('Failed to start workout. Please try again.');
    } finally {
      setIsStartingWorkout(false);
    }
  };

  if (isLoading && !schedule) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <Skeleton key={day} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No Schedule Found</h1>
        <p className="text-gray-600">Please check back later or contact support.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with navigation */}
      <ScheduleHeader 
        title="Training Schedule"
        currentWeek={{
          phase: selectedPhase,
          week: selectedWeek,
          startDate: schedule.startDate.toISOString(),
          endDate: schedule.endDate.toISOString()
        }}
        onNavigateCurrent={loadCurrentWeek}
      >
        <WeekNavigator
          phase={selectedPhase}
          week={selectedWeek}
          phases={phases}
          isNavigating={isNavigating}
          onWeekChange={handleWeekChange}
          onPhaseChange={handlePhaseChange}
          onWeekSelect={handleWeekSelect}
          onGo={() => fetchSchedule(selectedPhase, selectedWeek)}
        />
      </ScheduleHeader>

      {/* Week Stats */}
      <StatsGrid stats={stats} />

      {/* Weekly Schedule */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            Weekly Training Schedule
            <div className="ml-auto">
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-4 text-sm font-normal"
                  >
                    {startDate ? format(startDate, 'MMM d, yyyy') : 'Select start date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <DatePickerWithPresets
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    fromDate={new Date()}
                    showDayNavigation
                    showOutsideDays
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardTitle>
          <CardDescription>
            Power Development Phase • Week {selectedWeek} of {phases[selectedPhase]?.length || 0}
            {startDate && (
              <span>
                {' • '}
                {format(addWeeks(startDate, selectedWeek - 1), 'MMM d')} - {format(addDays(addWeeks(startDate, selectedWeek - 1), 6), 'MMM d, yyyy')}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {schedule.workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                startDate={schedule.startDate.toISOString()}
                onStartWorkout={handleStartWorkout}
                isStartingWorkout={isStartingWorkout}
              />
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}