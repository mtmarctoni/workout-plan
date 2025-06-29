"use client";

import { useState, useEffect } from 'react';
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
  BarChart3,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardData } from './actions';

// Type definitions
interface PerformanceData {
  week: number;
  verticalJump: number;
  shuttleTime: number;
  pullUps: number;
  volume?: number;
  workouts?: number;
}

interface WorkoutSession {
  id: string;
  name: string;
  date: string;
  duration: number | null;
  status: string;
  workoutPlan: {
    name: string;
    phase: number;
    week: number;
  } | null;
  [key: string]: any; // For any additional properties
}

interface WorkoutHistory {
  id: string;
  name: string;
  completion: number;
  date: string;
  type?: string;
  workoutPlan?: {
    focus?: string;
  };
}

interface WorkoutPlan {
  id: string;
  name: string;
  type: string;
  difficulty?: string;
  focus?: string;
  exercises: any[];
  estimatedDuration?: number;
  [key: string]: any; // For any additional properties
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  [key: string]: any;
}

interface UpcomingWorkout {
  id: string;
  name: string;
  type: string;
  time: string;
  difficulty: string;
  focus?: string;
  exercises: Exercise[];
  estimatedDuration: number;
}

interface UserProfile {
  currentWeek: number;
  currentPhase: number;
}

// Define the actual data structure returned from getDashboardData
interface ApiWorkoutSession {
  id: string;
  name: string;
  date: string;
  duration: number | null;
  status: string;
  workoutPlan: {
    name: string;
    phase: number;
    week: number;
  } | null;
}

interface ApiWorkoutPlan {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  focus?: string;
  exercises?: any; // Will be validated and transformed
  estimatedDuration?: number;
}

interface DashboardData {
  userProfile: UserProfile;
  recentSessions: ApiWorkoutSession[];
  upcomingWorkouts: ApiWorkoutPlan[];
  performanceData: PerformanceData[];
}

interface PhaseProgress {
  current: string;
  week: number;
  totalWeeks: number;
  nextPhase: string;
  focus: string;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  // const [performanceData, setPerformanceData] = useState<PerformanceData>({});
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);
  const [upcomingWorkouts, setUpcomingWorkouts] = useState<UpcomingWorkout[]>([]);
  const [phaseProgress, setPhaseProgress] = useState<PhaseProgress>({
    current: '',
    week: 0,
    totalWeeks: 3,
    nextPhase: '',
    focus: ''
  });
  const [metrics, setMetrics] = useState<MetricsState>({
    verticalJump: 0,
    streak: 0,
    weeklyGoal: { completed: 0, total: 5 },
    phaseProgress: 0
  });

  // Add type for the metrics state
  interface MetricsState {
    verticalJump: number;
    streak: number;
    weeklyGoal: {
      completed: number;
      total: number;
    };
    phaseProgress: number;
  }

  useEffect(() => {
    const fetchData = async () => {
      const userId='user1'
      try {
        setIsLoading(true);
        const data = await getDashboardData(userId);
        
        // Set basic metrics
        setCurrentWeek(data.userProfile?.currentWeek || 0);
        setCurrentPhase(data.userProfile?.currentPhase || 1);
        
        // Set performance data
        // if (data.performanceData && data.performanceData.length > 0) {
        //   setPerformanceData(data.performanceData);
        //   const latestData = data.performanceData[data.performanceData.length - 1];
        //   setMetrics(prev => ({
        //     ...prev,
        //     verticalJump: latestData.verticalJump || 0,
        //   }));
        // }
        
        // Set workout history
        if (data.recentSessions && data.recentSessions.length > 0) {
          const history: WorkoutHistory[] = data.recentSessions.map(session => ({
            id: session.id,
            name: session.name,
            completion: session.status === 'COMPLETED' ? 100 : 0,
            date: new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            type: session.workoutPlan?.name || 'General',
            workoutPlan: {
              focus: `Phase ${session.workoutPlan?.phase || 1} - Week ${session.workoutPlan?.week || 1}`
            }
          }));
          setWorkoutHistory(history);
        }
        
        // Set upcoming workouts
        if (data.upcomingWorkouts && data.upcomingWorkouts.length > 0) {
          const upcoming: UpcomingWorkout[] = data.upcomingWorkouts
            .filter((workout): workout is {
              id: string;
              name: string;
              type: string;
              phase: number;
              week: number;
              day: number;
              difficulty: string;
              exercises: number;
              estimatedDuration: number;
              time: string;
              focus?: string;
            } => {
              return !!workout && 
                     'id' in workout &&
                     'name' in workout &&
                     'type' in workout &&
                     'phase' in workout &&
                     'week' in workout &&
                     'day' in workout &&
                     'difficulty' in workout &&
                     'exercises' in workout &&
                     'estimatedDuration' in workout &&
                     'time' in workout;
            })
            .map(workout => {
              // Ensure exercises is always an array of the correct shape
              let exercises: Exercise[] = [];
              if (Array.isArray(workout.exercises)) {
                exercises = workout.exercises.map(ex => ({
                  id: ex.id || Math.random().toString(36).substr(2, 9),
                  name: ex.name || 'Unnamed Exercise',
                  sets: typeof ex.sets === 'number' ? ex.sets : 3,
                  reps: ex.reps || '8-12',
                  rest: ex.rest || '60s',
                  ...ex
                }));
              }
              
              return {
                id: workout.id,
                name: workout.name || 'Unnamed Workout',
                type: workout.type || 'General',
                time: '6:00 PM', // Default time, adjust as needed
                difficulty: workout.difficulty || 'Medium',
                focus: workout.focus || '',
                exercises,
                estimatedDuration: typeof workout.estimatedDuration === 'number' ? workout.estimatedDuration : 60 // Default to 60 minutes
              };
            });
            
          setUpcomingWorkouts(upcoming);
        }
        
        // Set phase progress
        const phaseNames = ['Foundation', 'Strength', 'Power', 'Peak'];
        const currentPhaseName = phaseNames[(data.userProfile?.currentPhase || 1) - 1] || 'Foundation';
        const nextPhaseName = phaseNames[data.userProfile?.currentPhase || 1] || 'Next';
        
        setPhaseProgress({
          current: currentPhaseName,
          week: data.userProfile?.currentWeek || 1,
          totalWeeks: 3, // Assuming 3 weeks per phase
          nextPhase: nextPhaseName,
          focus: `Focusing on ${currentPhaseName.toLowerCase()} phase objectives`
        });
        
        // Update metrics
        setMetrics(prev => ({
          ...prev,
          phaseProgress: Math.round((data.userProfile?.currentWeek / 3) * 100) || 0,
          weeklyGoal: {
            completed: data.recentSessions?.length || 0,
            total: 5
          },
          streak: calculateStreak(data.recentSessions || [])
        }));
        
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);


  
  // Helper function to calculate workout streak
  const calculateStreak = (sessions: WorkoutSession[]) => {
    if (!sessions.length) return 0;
    
    // Sort sessions by date in descending order
    const sortedSessions = [...sessions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    let prevDate: Date | null = null;
    
    for (const session of sortedSessions) {
      const currentDate = new Date(session.date);
      currentDate.setHours(0, 0, 0, 0);
      
      if (!prevDate) {
        // First session in the list
        prevDate = currentDate;
        streak = 1;
        continue;
      }
      
      // Calculate days between current and previous session
      const diffTime = Math.abs(prevDate.getTime() - currentDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive days
        streak++;
        prevDate = currentDate;
      } else if (diffDays > 1) {
        // Streak broken
        break;
      }
    }
    
    return streak;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Training Dashboard</h1>
          <p className="text-gray-600">
            {currentWeek > 0 ? `Week ${currentWeek} • ` : ''}
            {phaseProgress.current ? `Phase ${currentPhase}: ${phaseProgress.current}` : 'Loading...'}
          </p>
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
                <p className="text-2xl font-bold">{metrics.verticalJump || '--'} cm</p>
                {/* <p className="text-xs text-green-600 flex items-center gap-1">
                  {performanceData.length > 1 && (
                    <>
                      <TrendingUp className="w-3 h-3" />
                      +{performanceData[performanceData.length - 1].verticalJump - performanceData[0].verticalJump} cm improvement
                    </>
                  )}
                </p> */}
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
                <p className="text-2xl font-bold">{metrics.streak || 0} days</p>
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  {metrics.streak > 0 && (
                    <>
                      <Award className="w-3 h-3" />
                      {metrics.streak >= 7 ? 'Personal best!' : 'Keep it up!'}
                    </>
                  )}
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
                <p className="text-2xl font-bold">
                  {metrics.weeklyGoal.completed}/{metrics.weeklyGoal.total}
                </p>
                <p className="text-xs text-purple-600">
                  {Math.round((metrics.weeklyGoal.completed / metrics.weeklyGoal.total) * 100)}% complete
                </p>
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
        {/* <Card className="lg:col-span-2">
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
        </Card> */}

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