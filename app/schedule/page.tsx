"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, dateFns } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Calendar as CalendarIcon,
  Clock,
  Target,
  Play,
  CheckCircle,
  Plus,
  Filter,
  TrendingUp
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const workoutSchedule = {
    'Monday': {
      name: 'Upper Body Power',
      type: 'Power',
      duration: '45 min',
      phase: 'Power Development',
      exercises: 5,
      status: 'completed',
      time: '6:00 PM'
    },
    'Tuesday': {
      name: 'Lower Body Strength',
      type: 'Strength',
      duration: '50 min',
      phase: 'Power Development',
      exercises: 6,
      status: 'completed',
      time: '6:00 PM'
    },
    'Wednesday': {
      name: 'Recovery & Mobility',
      type: 'Recovery',
      duration: '30 min',
      phase: 'Power Development',
      exercises: 4,
      status: 'active',
      time: '7:00 AM'
    },
    'Thursday': {
      name: 'Explosive Power Training',
      type: 'Power',
      duration: '45 min',
      phase: 'Power Development',
      exercises: 5,
      status: 'scheduled',
      time: '6:00 PM'
    },
    'Friday': {
      name: 'Agility & Speed',
      type: 'Agility',
      duration: '40 min',
      phase: 'Power Development',
      exercises: 4,
      status: 'scheduled',
      time: '6:00 PM'
    },
    'Saturday': {
      name: 'Competition Simulation',
      type: 'Competition',
      duration: '60 min',
      phase: 'Power Development',
      exercises: 8,
      status: 'scheduled',
      time: '10:00 AM'
    },
    'Sunday': {
      name: 'Active Recovery',
      type: 'Recovery',
      duration: '25 min',
      phase: 'Power Development',
      exercises: 3,
      status: 'scheduled',
      time: '11:00 AM'
    }
  };

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'scheduled': return 'bg-gray-300';
      default: return 'bg-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'active': return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
      case 'scheduled': return <Badge variant="outline">Scheduled</Badge>;
      default: return <Badge variant="secondary">Not Scheduled</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Power': return 'bg-orange-100 text-orange-800';
      case 'Strength': return 'bg-blue-100 text-blue-800';
      case 'Agility': return 'bg-purple-100 text-purple-800';
      case 'Recovery': return 'bg-green-100 text-green-800';
      case 'Competition': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const weekStats = {
    totalWorkouts: 7,
    completed: 2,
    scheduled: 5,
    totalDuration: '315 min',
    averageIntensity: 'High'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Training Schedule</h1>
          <p className="text-gray-600">
            Week {format(weekStart, 'MMM d')} - {format(endOfWeek(weekStart, { weekStartsOn: 1 }), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Workout
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule New Workout</DialogTitle>
                <DialogDescription>
                  Add a custom workout to your training schedule
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Workout scheduling functionality would be implemented here with form controls
                  for selecting date, time, workout type, and exercises.
                </p>
              </div>
              <DialogFooter>
                <Button>Schedule Workout</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
            <CalendarIcon className="w-4 h-4 mr-2" />
            Export Calendar
          </Button>
        </div>
      </div>

      {/* Week Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{weekStats.totalWorkouts}</div>
            <div className="text-sm text-gray-600">Total Workouts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{weekStats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{weekStats.totalDuration}</div>
            <div className="text-sm text-gray-600">Total Duration</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{weekStats.averageIntensity}</div>
            <div className="text-sm text-gray-600">Avg Intensity</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            Weekly Training Schedule
          </CardTitle>
          <CardDescription>
            Power Development Phase • Week 2 of 3
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {weekDays.map((day, index) => {
              const dayName = format(day, 'EEEE');
              const workout = workoutSchedule[dayName as keyof typeof workoutSchedule];
              
              return (
                <div key={index} className="space-y-2">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">{format(day, 'EEE')}</div>
                    <div className="text-lg font-bold">{format(day, 'd')}</div>
                  </div>
                  
                  {workout ? (
                    <Card className="min-h-[200px] hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className={`w-full h-1 rounded-full ${getStatusColor(workout.status)}`} />
                          
                          <div>
                            <h3 className="font-semibold text-sm mb-1">{workout.name}</h3>
                            <div className="space-y-1">
                              <Badge className={getTypeColor(workout.type)} size="sm">
                                {workout.type}
                              </Badge>
                              {getStatusBadge(workout.status)}
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{workout.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              <span>{workout.duration}</span>
                            </div>
                            <div>{workout.exercises} exercises</div>
                          </div>
                          
                          {workout.status === 'active' && (
                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                              <Play className="w-3 h-3 mr-1" />
                              Start
                            </Button>
                          )}
                          
                          {workout.status === 'completed' && (
                            <div className="flex items-center justify-center text-xs text-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="min-h-[200px] border-dashed">
                      <CardContent className="p-4 flex items-center justify-center h-full">
                        <div className="text-center text-gray-400">
                          <Plus className="w-6 h-6 mx-auto mb-2" />
                          <div className="text-xs">Rest Day</div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Phase Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Phase Progress
            </CardTitle>
            <CardDescription>
              Power Development Phase Overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Week 2 of 3</span>
                  <span>67% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '67%' }} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">14</div>
                  <div className="text-xs text-gray-600">Workouts Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">7</div>
                  <div className="text-xs text-gray-600">Remaining</div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Focus Areas This Week</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Explosive power development</li>
                  <li>• Competition simulation</li>
                  <li>• Recovery optimization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Upcoming Milestones
            </CardTitle>
            <CardDescription>
              Key assessments and phase transitions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-blue-900">Mid-Phase Assessment</h4>
                    <p className="text-sm text-blue-700">Performance testing</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">In 2 days</Badge>
                </div>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-orange-900">Phase Transition</h4>
                    <p className="text-sm text-orange-700">Move to Peak Performance</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">In 1 week</Badge>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-green-900">Program Completion</h4>
                    <p className="text-sm text-green-700">12-week program end</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">In 4 weeks</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}