"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Calendar, 
  TrendingUp, 
  Users, 
  Award, 
  Play,
  ArrowRight,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [activePhase] = useState(1);
  const [weekProgress] = useState(2);

  const phases = [
    { id: 1, name: 'Foundation', weeks: '1-3', focus: 'Base Building & Movement Quality', color: 'bg-blue-500' },
    { id: 2, name: 'Strength', weeks: '4-6', focus: 'Power Development & Stability', color: 'bg-green-500' },
    { id: 3, name: 'Power', weeks: '7-9', focus: 'Explosive Movement & Speed', color: 'bg-orange-500' },
    { id: 4, name: 'Peak', weeks: '10-12', focus: 'Competition Readiness', color: 'bg-purple-500' }
  ];

  const todayWorkout = {
    phase: 'Foundation',
    day: 'Upper Body Power',
    exercises: 5,
    duration: '45 min',
    completed: false
  };

  const recentProgress = [
    { metric: 'Vertical Jump', value: '58 cm', change: '+3 cm', trend: 'up' },
    { metric: 'Shuttle Run', value: '4.2 sec', change: '-0.1 sec', trend: 'up' },
    { metric: 'Pull-ups', value: '12 reps', change: '+2 reps', trend: 'up' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Target className="w-4 h-4" />
          Professional Athletic Development
        </div>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Handball Training Pro
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Advanced periodized training system designed specifically for handball athletes. 
          Build power, agility, and performance with science-backed methodologies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Start Training
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/exercises">
            <Button size="lg" variant="outline" className="px-8">
              <Play className="mr-2 w-4 h-4" />
              View Exercises
            </Button>
          </Link>
        </div>
      </div>

      {/* Current Program Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  12-Week Periodized Program
                </CardTitle>
                <CardDescription>
                  Phase {activePhase} of 4 • Week {weekProgress} of 3
                </CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {phases[activePhase - 1]?.name} Phase
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Program Progress</span>
                  <span>{Math.round((((activePhase - 1) * 3 + weekProgress) / 12) * 100)}%</span>
                </div>
                <Progress value={((activePhase - 1) * 3 + weekProgress) / 12 * 100} className="h-2" />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {phases.map((phase) => (
                  <div key={phase.id} className="text-center">
                    <div className={`w-full h-2 rounded-full mb-2 ${
                      phase.id < activePhase ? 'bg-green-500' : 
                      phase.id === activePhase ? phase.color : 
                      'bg-gray-200'
                    }`} />
                    <div className="text-xs font-medium">{phase.name}</div>
                    <div className="text-xs text-gray-500">{phase.weeks}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Today's Workout
            </CardTitle>
            <CardDescription>
              {todayWorkout.phase} Phase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{todayWorkout.day}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {todayWorkout.exercises} exercises
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {todayWorkout.duration}
                  </span>
                </div>
              </div>
              
              <Link href="/workout">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  {todayWorkout.completed ? 'Review Workout' : 'Start Workout'}
                  <Play className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {recentProgress.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.metric}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className={`text-sm flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                    {metric.change}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Program Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Periodized Training</h3>
            <p className="text-sm text-gray-600">
              Scientifically structured 12-week program with progressive phases
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Hyperlaxity Adapted</h3>
            <p className="text-sm text-gray-600">
              Specialized modifications for athletes with joint hypermobility
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Progress Tracking</h3>
            <p className="text-sm text-gray-600">
              Real-time performance monitoring with detailed analytics
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Pro Level</h3>
            <p className="text-sm text-gray-600">
              Elite training protocols used by professional handball teams
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Performance?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of handball athletes who have improved their game with our proven training system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="px-8">
                Access Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/analytics">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                View Analytics
                <BarChart3 className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}