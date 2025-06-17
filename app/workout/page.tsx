"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  Play,
  Pause,
  SkipForward,
  Timer,
  CheckCircle,
  Settings,
  Info,
  Zap,
  Target,
  AlertTriangle
} from 'lucide-react';

export default function Workout() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [completedSets, setCompletedSets] = useState<{[key: number]: number}>({});

  const todayWorkout = {
    name: "Upper Body Power Development",
    phase: "Power Phase",
    week: 2,
    day: 3,
    duration: "45 min",
    exercises: [
      {
        id: 1,
        name: "Medicine Ball Explosive Push-ups",
        sets: 4,
        reps: "8-10",
        rest: "90s",
        type: "Power",
        equipment: ["Medicine Ball", "Mat"],
        hyperlaxityMod: "Reduce range of motion by 20%, focus on controlled eccentric",
        videoUrl: "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg",
        instructions: [
          "Start in push-up position with hands on medicine ball",
          "Lower chest to ball with control",
          "Explosively push up, releasing hands from ball",
          "Land with hands back on ball, immediately lower for next rep"
        ]
      },
      {
        id: 2,
        name: "Plyometric Pull-ups",
        sets: 3,
        reps: "5-8",
        rest: "2 min",
        type: "Power",
        equipment: ["Pull-up Bar"],
        hyperlaxityMod: "Use resistance band assistance, focus on controlled descent",
        videoUrl: "https://images.pexels.com/photos/863977/pexels-photo-863977.jpeg",
        instructions: [
          "Hang from pull-up bar with overhand grip",
          "Pull up explosively, aiming to get chest to bar",
          "Release grip briefly at top if possible",
          "Re-grip and control descent slowly"
        ]
      },
      {
        id: 3,
        name: "Rotational Medicine Ball Throws",
        sets: 4,
        reps: "6 each side",
        rest: "60s",
        type: "Power",
        equipment: ["Medicine Ball", "Wall"],
        hyperlaxityMod: "Start with lighter ball, focus on core stability",
        videoUrl: "https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg",
        instructions: [
          "Stand sideways to wall, holding medicine ball",
          "Rotate trunk away from wall, then explosively throw ball",
          "Catch ball on rebound and immediately repeat",
          "Complete all reps one side before switching"
        ]
      },
      {
        id: 4,
        name: "Battle Rope Alternating Waves",
        sets: 3,
        reps: "30s",
        rest: "90s",
        type: "Power",
        equipment: ["Battle Ropes"],
        hyperlaxityMod: "Reduce intensity, focus on shoulder stability",
        videoUrl: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg",
        instructions: [
          "Hold rope ends with neutral grip",
          "Create alternating waves by rapidly moving arms up and down",
          "Keep core engaged and maintain athletic stance",
          "Focus on speed and power, not just endurance"
        ]
      },
      {
        id: 5,
        name: "Jump Squats with Pause",
        sets: 4,
        reps: "8-12",
        rest: "75s",
        type: "Power",
        equipment: ["None"],
        hyperlaxityMod: "Land softly, hold squat position for 2 seconds",
        videoUrl: "https://images.pexels.com/photos/863975/pexels-photo-863975.jpeg",
        instructions: [
          "Start in squat position, pause for 1 second",
          "Jump explosively upward, reaching for maximum height",
          "Land softly in squat position",
          "Hold bottom position before next rep"
        ]
      }
    ]
  };

  const currentEx = todayWorkout.exercises[currentExercise];
  const workoutProgress = ((currentExercise + 1) / todayWorkout.exercises.length) * 100;

  const handleCompleteSet = () => {
    const currentSets = completedSets[currentExercise] || 0;
    if (currentSets < currentEx.sets) {
      setCompletedSets({
        ...completedSets,
        [currentExercise]: currentSets + 1
      });
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < todayWorkout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setTimeRemaining(45);
      setIsActive(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Workout Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-orange-100 text-orange-800">
            {todayWorkout.phase}
          </Badge>
          <Badge variant="outline">
            Week {todayWorkout.week} • Day {todayWorkout.day}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">{todayWorkout.name}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Timer className="w-4 h-4" />
            {todayWorkout.duration}
          </span>
          <span className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            {todayWorkout.exercises.length} exercises
          </span>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Workout Progress</span>
            <span className="text-sm text-gray-600">
              {currentExercise + 1} of {todayWorkout.exercises.length}
            </span>
          </div>
          <Progress value={workoutProgress} className="h-2" />
        </div>
      </div>

      {/* Main Workout Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Exercise */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  {currentEx.name}
                </CardTitle>
                <CardDescription>
                  Exercise {currentExercise + 1} of {todayWorkout.exercises.length}
                </CardDescription>
              </div>
              <Badge className={`${
                currentEx.type === 'Power' ? 'bg-orange-100 text-orange-800' :
                currentEx.type === 'Strength' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {currentEx.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="exercise" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="exercise">Exercise</TabsTrigger>
                <TabsTrigger value="modifications">Modifications</TabsTrigger>
                <TabsTrigger value="form">Form Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="exercise" className="space-y-4">
                {/* Exercise Video/Image */}
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={currentEx.videoUrl} 
                    alt={currentEx.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Exercise Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{currentEx.sets}</p>
                    <p className="text-sm text-gray-600">Sets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{currentEx.reps}</p>
                    <p className="text-sm text-gray-600">Reps</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{currentEx.rest}</p>
                    <p className="text-sm text-gray-600">Rest</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {completedSets[currentExercise] || 0}
                    </p>
                    <p className="text-sm text-gray-600">Complete</p>
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h4 className="font-medium mb-2">Equipment Needed</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentEx.equipment.map((item, index) => (
                      <Badge key={index} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="modifications" className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-1">Hyperlaxity Modification</h4>
                      <p className="text-sm text-amber-700">{currentEx.hyperlaxityMod}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="form" className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Step-by-Step Instructions</h4>
                  <ol className="space-y-2">
                    {currentEx.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-sm">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Workout Controls */}
        <div className="space-y-6">
          {/* Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5 text-blue-600" />
                Rest Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold mb-4">{formatTime(timeRemaining)}</div>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => setIsActive(!isActive)}
                  className={isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isActive ? 'Pause' : 'Start'}
                </Button>
                <Button variant="outline" onClick={() => setTimeRemaining(45)}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Set Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Set Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Completed Sets</span>
                  <span className="font-bold">
                    {completedSets[currentExercise] || 0} / {currentEx.sets}
                  </span>
                </div>
                <Progress 
                  value={((completedSets[currentExercise] || 0) / currentEx.sets) * 100} 
                  className="h-2"
                />
                <Button 
                  onClick={handleCompleteSet}
                  className="w-full"
                  disabled={(completedSets[currentExercise] || 0) >= currentEx.sets}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Set
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Exercise Navigation */}
          <Card>
            <CardHeader>
              <CardTitle>Exercise Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
                  disabled={currentExercise === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNextExercise}
                  disabled={currentExercise === todayWorkout.exercises.length - 1}
                >
                  Next
                  <SkipForward className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              {currentExercise === todayWorkout.exercises.length - 1 && (
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Workout
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Log Weight/Reps
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Log Performance</DialogTitle>
                    <DialogDescription>
                      Record your actual performance for this set
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" type="number" placeholder="0" />
                    </div>
                    <div>
                      <Label htmlFor="reps">Reps</Label>
                      <Input id="reps" type="number" placeholder="0" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Save Performance</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="w-full">
                <Info className="w-4 h-4 mr-2" />
                Exercise Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}