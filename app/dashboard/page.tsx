"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart
} from 'recharts';
import {
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Zap,
  Activity,
  CheckCircle,
  Play,
  Timer,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [currentWeek] = useState(8);
  const [currentPhase] = useState(3);

  const performanceData = [
    { week: 1, verticalJump: 45, shuttleTime: 4.8, pullUps: 8 },
    { week: 2, verticalJump: 47, shuttleTime: 4.7, pullUps: 9 },
    { week: 3, verticalJump: 48, shuttleTime: 4.6, pullUps: 10 },
    { week: 4, verticalJump: 50, shuttleTime: 4.5, pullUps: 11 },
    { week: 5, verticalJump: 52, shuttleTime: 4.4, pullUps: 12 },
    { week: 6, verticalJump: 53, shuttleTime: 4.3, pullUps: 13 },
    { week: 7, verticalJump: 55, shuttleTime: 4.2, pullUps: 14 },
    { week: 8, verticalJump: 58, shuttleTime: 4.1, pullUps: 15 }
  ];

  const workoutHistory = [
    { name: 'Upper Power', completion: 100, date: 'Today' },
    { name: 'Lower Strength', completion: 95, date: 'Yesterday' },
    { name: 'Core & Stability', completion: 100, date: '2 days ago' },
    { name: 'Agility Training', completion: 88, date: '3 days ago' },
    { name: 'Recovery Session', completion: 100, date: '4 days ago' }
  ];

  const upcomingWorkouts = [
    { name: 'Explosive Power', type: 'Lower Body', time: '6:00 PM', difficulty: 'High' },
    { name: 'Recovery & Mobility', type: 'Recovery', time: '7:00 AM', difficulty: 'Low' },
    { name: 'Upper Body Strength', type: 'Strength', time: '6:00 PM', difficulty: 'Medium' }
  ];

  const phaseProgress = {
    current: 'Power Development',
    week: 2,
    totalWeeks: 3,
    nextPhase: 'Peak Performance',
    focus: 'Building explosive power and speed for competition readiness'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Training Dashboard</h1>
          <p className="text-gray-600">Week {currentWeek} • Phase {currentPhase}: {phaseProgress.current}</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Link href="/workout">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Start Workout
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Phase Progress</p>
                <p className="text-2xl font-bold">{Math.round((phaseProgress.week / phaseProgress.totalWeeks) * 100)}%</p>
                <p className="text-xs text-gray-500">Week {phaseProgress.week} of {phaseProgress.totalWeeks}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vertical Jump</p>
                <p className="text-2xl font-bold">58 cm</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +13 cm improvement
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Workout Streak</p>
                <p className="text-2xl font-bold">12 days</p>
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Personal best!
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Goal</p>
                <p className="text-2xl font-bold">4/5</p>
                <p className="text-xs text-purple-600">80% complete</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Tracking</CardTitle>
            <CardDescription>
              Your progress across key handball performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="jump" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="jump">Vertical Jump</TabsTrigger>
                <TabsTrigger value="shuttle">Shuttle Time</TabsTrigger>
                <TabsTrigger value="pullups">Pull-ups</TabsTrigger>
              </TabsList>
              
              <TabsContent value="jump" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="verticalJump" 
                        stroke="#2563EB" 
                        fill="#DBEAFE" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="shuttle" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="shuttleTime" 
                        stroke="#16A34A" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="pullups" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="pullUps" fill="#EA580C" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Current Phase Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Current Phase
            </CardTitle>
            <CardDescription>
              Phase {currentPhase} of 4
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{phaseProgress.current}</h3>
                <Badge className="bg-blue-100 text-blue-800">Active</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4">{phaseProgress.focus}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Week Progress</span>
                  <span>{phaseProgress.week}/{phaseProgress.totalWeeks}</span>
                </div>
                <Progress value={(phaseProgress.week / phaseProgress.totalWeeks) * 100} />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Next Phase</h4>
              <p className="text-sm text-gray-600">{phaseProgress.nextPhase}</p>
              <p className="text-xs text-gray-500 mt-1">Starts in {phaseProgress.totalWeeks - phaseProgress.week} week(s)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workout History & Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Workouts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-green-600" />
              Recent Workouts
            </CardTitle>
            <CardDescription>
              Your last 5 training sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workoutHistory.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      workout.completion === 100 ? 'bg-green-500' : 'bg-orange-500'
                    }`} />
                    <div>
                      <p className="font-medium">{workout.name}</p>
                      <p className="text-sm text-gray-500">{workout.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{workout.completion}%</p>
                    <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-1 bg-green-500 rounded-full" 
                        style={{ width: `${workout.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Workouts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Upcoming Workouts
            </CardTitle>
            <CardDescription>
              Your next scheduled training sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingWorkouts.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{workout.name}</p>
                    <p className="text-sm text-gray-500">{workout.type} • {workout.time}</p>
                  </div>
                  <Badge variant={
                    workout.difficulty === 'High' ? 'destructive' :
                    workout.difficulty === 'Medium' ? 'default' : 'secondary'
                  }>
                    {workout.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link href="/schedule">
                <Button variant="outline" className="w-full">
                  View Full Schedule
                  <Calendar className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}