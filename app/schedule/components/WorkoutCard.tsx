import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Loader2, Play, Target, Info } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { WorkoutDay } from '../types';
import { WorkoutDetailsDialog } from '@/components/workout-details-dialog';

interface WorkoutCardProps {
  workout: WorkoutDay;
  startDate: string;
  onStartWorkout: (workoutId: string) => void;
  isStartingWorkout: boolean;
}

export function WorkoutCard({ 
  workout, 
  startDate, 
  onStartWorkout, 
  isStartingWorkout 
}: WorkoutCardProps) {
  const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayName = DAY_NAMES[workout.day - 1];
  const dayDate = new Date(startDate);
  dayDate.setDate(dayDate.getDate() + (workout.day - 1));
  
  const isRestDay = workout.type === 'Rest' || workout.type === 'Rest Day';
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const completionPercentage = workout.exercisesCount > 0 
    ? Math.round(((workout.completedExercises || 0) / workout.exercisesCount) * 100) 
    : 0;
    
  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDetailsOpen(true);
  };
  
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default:
        return <Badge variant="outline">Scheduled</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'power':
        return 'bg-orange-100 text-orange-800';
      case 'strength':
        return 'bg-blue-100 text-blue-800';
      case 'agility':
        return 'bg-purple-100 text-purple-800';
      case 'recovery':
      case 'rest':
        return 'bg-green-100 text-green-800';
      case 'competition':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className={`${workout.status === 'in-progress' ? 'border-2 border-blue-500' : ''} ${
        isRestDay ? 'bg-gray-50' : ''
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{dayName}</CardTitle>
            <CardDescription>{format(dayDate, 'MMM d')}</CardDescription>
          </div>
          {!isRestDay && (
            <div 
              className={`w-3 h-3 rounded-full ${
                workout.status === 'completed' ? 'bg-green-500' : 
                workout.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isRestDay ? (
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{workout.name}</h3>
                <Badge variant="outline" className={`mt-1 ${getTypeColor(workout.type)}`}>
                  {workout.type}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">
                  {workout.duration} min
                </div>
                {workout.startTime && (
                  <div className="text-sm text-gray-500 flex items-center justify-end">
                    <Clock className="w-3 h-3 mr-1" />
                    {workout.startTime}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center">
                <Target className="w-3 h-3 mr-1 text-gray-400" />
                {workout.exercisesCount} exercises
              </div>
              {getStatusBadge(workout.status)}
            </div>
            
            {workout.exercisesCount > 0 && (
              <div className="pt-2 border-t">
                <div className="text-xs text-gray-500 mb-1">
                  {completionPercentage}% Complete
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      workout.status === 'completed' ? 'bg-green-500' : 
                      workout.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} 
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Button 
                variant="outline"
                size="sm" 
                className="w-full"
                onClick={handleViewDetails}
              >
                <Info className="w-4 h-4 mr-2" />
                Details
              </Button>
              <Button 
                variant={workout.status === 'in-progress' ? 'default' : 'outline'} 
                size="sm" 
                className="w-full"
                onClick={() => onStartWorkout(workout.id)}
                disabled={isStartingWorkout}
              >
                {isStartingWorkout ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span className="ml-2">
                  {workout.status === 'in-progress' ? 'Continue' : 'Start'}
                </span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400">
            <div className="text-sm mb-2">Rest Day</div>
            <div className="text-xs">No workouts scheduled</div>
            <div className="mt-2">
              <Button variant="ghost" size="sm" className="text-xs">
                Add Activity
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      
      {!isRestDay && (
        <WorkoutDetailsDialog
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          workout={{
            id: workout.id,
            name: workout.name,
            description: workout.description,
            type: workout.type,
            duration: workout.duration,
            exercises: workout.exercises || [],
            exercisesCount: workout.exercisesCount,
            completedExercises: workout.completedExercises,
            phase: workout.phase,
            week: workout.week,
            day: workout.day,
            status: workout.status,
            startTime: workout.startTime || undefined
          }}
        />
      )}
    </Card>
  );
}
