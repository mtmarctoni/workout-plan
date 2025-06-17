"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Calendar,
  Download,
  Share,
  Filter,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('12-week');

  const performanceData = [
    { week: 1, verticalJump: 45, shuttleTime: 4.8, pullUps: 8, overallScore: 65 },
    { week: 2, verticalJump: 47, shuttleTime: 4.7, pullUps: 9, overallScore: 68 },
    { week: 3, verticalJump: 48, shuttleTime: 4.6, pullUps: 10, overallScore: 71 },
    { week: 4, verticalJump: 50, shuttleTime: 4.5, pullUps: 11, overallScore: 74 },
    { week: 5, verticalJump: 52, shuttleTime: 4.4, pullUps: 12, overallScore: 77 },
    { week: 6, verticalJump: 53, shuttleTime: 4.3, pullUps: 13, overallScore: 80 },
    { week: 7, verticalJump: 55, shuttleTime: 4.2, pullUps: 14, overallScore: 83 },
    { week: 8, verticalJump: 58, shuttleTime: 4.1, pullUps: 15, overallScore: 86 }
  ];

  const radarData = [
    { metric: 'Power', current: 85, baseline: 60 },
    { metric: 'Strength', current: 78, baseline: 65 },
    { metric: 'Speed', current: 82, baseline: 58 },
    { metric: 'Agility', current: 79, baseline: 62 },
    { metric: 'Endurance', current: 75, baseline: 70 },
    { metric: 'Flexibility', current: 73, baseline: 68 }
  ];

  const phaseComparisonData = [
    { phase: 'Foundation', power: 60, strength: 65, speed: 58 },
    { phase: 'Strength', power: 70, strength: 78, speed: 65 },
    { phase: 'Power', power: 85, strength: 80, speed: 82 },
    { phase: 'Peak', power: 90, strength: 82, speed: 88 }
  ];

  const workoutFrequencyData = [
    { week: 'W1', workouts: 5 },
    { week: 'W2', workouts: 6 },
    { week: 'W3', workouts: 5 },
    { week: 'W4', workouts: 6 },
    { week: 'W5', workouts: 7 },
    { week: 'W6', workouts: 6 },
    { week: 'W7', workouts: 7 },
    { week: 'W8', workouts: 6 }
  ];

  const keyMetrics = [
    {
      label: 'Vertical Jump',
      current: '58 cm',
      baseline: '45 cm',
      improvement: '+13 cm',
      percentage: 28.9,
      trend: 'up',
      color: 'text-green-600'
    },
    {
      label: 'Shuttle Time',
      current: '4.1 sec',
      baseline: '4.8 sec',
      improvement: '-0.7 sec',
      percentage: 14.6,
      trend: 'up',
      color: 'text-green-600'
    },
    {
      label: 'Pull-ups',
      current: '15 reps',
      baseline: '8 reps',
      improvement: '+7 reps',
      percentage: 87.5,
      trend: 'up',
      color: 'text-green-600'
    },
    {
      label: 'Overall Score',
      current: '86/100',
      baseline: '65/100',
      improvement: '+21 pts',
      percentage: 32.3,
      trend: 'up',
      color: 'text-green-600'
    }
  ];

  const achievements = [
    {
      title: 'Power Breakthrough',
      description: 'Achieved 20% improvement in vertical jump',
      date: 'Week 7',
      type: 'Performance',
      icon: '🚀'
    },
    {
      title: 'Consistency Champion',
      description: '15-day workout streak completed',
      date: 'Week 8',
      type: 'Commitment',
      icon: '🔥'
    },
    {
      title: 'Strength Milestone',
      description: 'Doubled initial pull-up performance',
      date: 'Week 8',
      type: 'Performance',
      icon: '💪'
    },
    {
      title: 'Speed Demon',
      description: 'Top 10% in shuttle run improvement',
      date: 'Week 6',
      type: 'Performance',
      icon: '⚡'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
          <p className="text-gray-600">
            Comprehensive analysis of your training progress and performance metrics
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Share Report
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-600">{metric.label}</h3>
                <div className={`flex items-center gap-1 ${metric.color}`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">+{metric.percentage}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{metric.current}</div>
                <div className="text-sm text-gray-500">
                  From {metric.baseline} • {metric.improvement}
                </div>
                <Progress value={metric.percentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Performance Trends
            </CardTitle>
            <CardDescription>
              Track your progress across key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overall" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="jump">Jump</TabsTrigger>
                <TabsTrigger value="shuttle">Speed</TabsTrigger>
                <TabsTrigger value="strength">Strength</TabsTrigger>
              </TabsList>

              <TabsContent value="overall" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="overallScore" 
                        stroke="#2563EB" 
                        fill="#DBEAFE" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="jump" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="verticalJump" 
                        stroke="#16A34A" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
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
                        stroke="#EA580C" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="strength" className="space-y-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="pullUps" fill="#7C3AED" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Performance Profile
            </CardTitle>
            <CardDescription>
              Current vs baseline comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar 
                    name="Current" 
                    dataKey="current" 
                    stroke="#2563EB" 
                    fill="#2563EB" 
                    fillOpacity={0.3}
                  />
                  <Radar 
                    name="Baseline" 
                    dataKey="baseline" 
                    stroke="#94A3B8" 
                    fill="#94A3B8" 
                    fillOpacity={0.1}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Phase Comparison & Workout Frequency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Phase Comparison
            </CardTitle>
            <CardDescription>
              Performance improvement across training phases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={phaseComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="phase" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="power" fill="#EA580C" />
                  <Bar dataKey="strength" fill="#2563EB" />
                  <Bar dataKey="speed" fill="#16A34A" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Workout Frequency
            </CardTitle>
            <CardDescription>
              Weekly training consistency over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={workoutFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="workouts" 
                    stroke="#F59E0B" 
                    fill="#FEF3C7" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Recent Achievements
            </CardTitle>
            <CardDescription>
              Milestones and breakthrough moments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {achievement.date}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    <Badge className={`mt-2 text-xs ${
                      achievement.type === 'Performance' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {achievement.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Performance Insights
            </CardTitle>
            <CardDescription>
              AI-generated recommendations and observations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">🎯 Strength Gains</h4>
                <p className="text-sm text-green-700">
                  Your pull-up performance has nearly doubled since week 1. Consider progressing to weighted variations.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">📈 Power Development</h4>
                <p className="text-sm text-blue-700">
                  Vertical jump improvements are accelerating. You're now in the top 15% for your age group.
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">⚡ Speed Progress</h4>
                <p className="text-sm text-orange-700">
                  Shuttle run times show consistent improvement. Focus on maintaining this momentum in the final phase.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">🎪 Recovery Balance</h4>
                <p className="text-sm text-purple-700">
                  Your recovery metrics suggest optimal training load. Continue current intensity patterns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}