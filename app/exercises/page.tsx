"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Search,
  Filter,
  Play,
  BookOpen,
  Target,
  Zap,
  Heart,
  AlertTriangle,
  Clock,
  Users
} from 'lucide-react';

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const exercises = [
    {
      id: 1,
      name: "Medicine Ball Explosive Push-ups",
      category: "Upper Body Power",
      level: "Intermediate",
      equipment: ["Medicine Ball", "Mat"],
      duration: "3-4 sets",
      type: "Power",
      hyperlaxity: true,
      image: "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg",
      description: "Develop explosive upper body power for throwing and blocking movements.",
      muscles: ["Chest", "Shoulders", "Triceps", "Core"],
      instructions: [
        "Start in push-up position with hands on medicine ball",
        "Lower chest to ball with control",
        "Explosively push up, releasing hands from ball",
        "Land with hands back on ball, immediately lower for next rep"
      ],
      modifications: "Reduce range of motion by 20%, focus on controlled eccentric"
    },
    {
      id: 2,
      name: "Plyometric Pull-ups",
      category: "Upper Body Power",
      level: "Advanced",
      equipment: ["Pull-up Bar"],
      duration: "3 sets",
      type: "Power",
      hyperlaxity: true,
      image: "https://images.pexels.com/photos/863977/pexels-photo-863977.jpeg",
      description: "Build explosive pulling power for defensive movements and ball interception.",
      muscles: ["Lats", "Rhomboids", "Biceps", "Core"],
      instructions: [
        "Hang from pull-up bar with overhand grip",
        "Pull up explosively, aiming to get chest to bar",
        "Release grip briefly at top if possible",
        "Re-grip and control descent slowly"
      ],
      modifications: "Use resistance band assistance, focus on controlled descent"
    },
    {
      id: 3,
      name: "Rotational Medicine Ball Throws",
      category: "Core Power",
      level: "Intermediate",
      equipment: ["Medicine Ball", "Wall"],
      duration: "4 sets",
      type: "Power",
      hyperlaxity: true,
      image: "https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg",
      description: "Enhance rotational power for shooting and passing accuracy.",
      muscles: ["Obliques", "Core", "Shoulders", "Hips"],
      instructions: [
        "Stand sideways to wall, holding medicine ball",
        "Rotate trunk away from wall, then explosively throw ball",
        "Catch ball on rebound and immediately repeat",
        "Complete all reps one side before switching"
      ],
      modifications: "Start with lighter ball, focus on core stability"
    },
    {
      id: 4,
      name: "Jump Squats with Pause",
      category: "Lower Body Power",
      level: "Beginner",
      equipment: ["None"],
      duration: "4 sets",
      type: "Power",
      hyperlaxity: true,
      image: "https://images.pexels.com/photos/863975/pexels-photo-863975.jpeg",
      description: "Develop explosive leg power for jumping and quick direction changes.",
      muscles: ["Quadriceps", "Glutes", "Calves", "Core"],
      instructions: [
        "Start in squat position, pause for 1 second",
        "Jump explosively upward, reaching for maximum height",
        "Land softly in squat position",
        "Hold bottom position before next rep"
      ],
      modifications: "Land softly, hold squat position for 2 seconds"
    },
    {
      id: 5,
      name: "Single-Leg Lateral Bounds",
      category: "Agility",
      level: "Intermediate",
      equipment: ["Cones"],
      duration: "3 sets",
      type: "Agility",
      hyperlaxity: true,
      image: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg",
      description: "Improve lateral movement and single-leg stability for defensive positioning.",
      muscles: ["Glutes", "Quadriceps", "Calves", "Core"],
      instructions: [
        "Stand on one leg with slight knee bend",
        "Bound laterally as far as possible",
        "Land on opposite leg, absorbing impact",
        "Immediately bound back to starting position"
      ],
      modifications: "Reduce bound distance, focus on stable landing"
    },
    {
      id: 6,
      name: "Stability Ball Pike Push-ups",
      category: "Core Strength",
      level: "Advanced",
      equipment: ["Stability Ball"],
      duration: "3 sets",
      type: "Strength",
      hyperlaxity: true,
      image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg",
      description: "Build core stability and shoulder strength for overhead throwing motions.",
      muscles: ["Core", "Shoulders", "Chest", "Hip Flexors"],
      instructions: [
        "Start in plank with feet on stability ball",
        "Pike up, bringing hips toward ceiling",
        "Lower into push-up position on ball",
        "Return to pike position and repeat"
      ],
      modifications: "Perform on knees, use smaller range of motion"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Upper Body Power', label: 'Upper Body Power' },
    { value: 'Lower Body Power', label: 'Lower Body Power' },
    { value: 'Core Power', label: 'Core Power' },
    { value: 'Agility', label: 'Agility' },
    { value: 'Core Strength', label: 'Core Strength' }
  ];

  const equipmentOptions = [
    { value: 'all', label: 'All Equipment' },
    { value: 'None', label: 'Bodyweight Only' },
    { value: 'Medicine Ball', label: 'Medicine Ball' },
    { value: 'Pull-up Bar', label: 'Pull-up Bar' },
    { value: 'Stability Ball', label: 'Stability Ball' },
    { value: 'Cones', label: 'Cones' }
  ];

  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesEquipment = selectedEquipment === 'all' || 
                            exercise.equipment.includes(selectedEquipment) ||
                            (selectedEquipment === 'None' && exercise.equipment.includes('None'));
    const matchesLevel = selectedLevel === 'all' || exercise.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesEquipment && matchesLevel;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Exercise Library</h1>
        <p className="text-gray-600">
          Comprehensive collection of handball-specific exercises with detailed instructions and modifications
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Exercises
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
              <SelectTrigger>
                <SelectValue placeholder="Equipment" />
              </SelectTrigger>
              <SelectContent>
                {equipmentOptions.map(equipment => (
                  <SelectItem key={equipment.value} value={equipment.value}>
                    {equipment.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levelOptions.map(level => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img 
                src={exercise.image} 
                alt={exercise.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{exercise.name}</CardTitle>
                  <CardDescription>{exercise.category}</CardDescription>
                </div>
                {exercise.hyperlaxity && (
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={`${
                  exercise.type === 'Power' ? 'bg-orange-100 text-orange-800' :
                  exercise.type === 'Strength' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {exercise.type}
                </Badge>
                <Badge variant="outline">{exercise.level}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{exercise.duration}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span>{exercise.muscles.join(', ')}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {exercise.equipment.map((item, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {exercise.name}
                      {exercise.hyperlaxity && (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      )}
                    </DialogTitle>
                    <DialogDescription>
                      {exercise.category} • {exercise.level}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={exercise.image} 
                        alt={exercise.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <Tabs defaultValue="instructions" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="instructions">Instructions</TabsTrigger>
                        <TabsTrigger value="muscles">Target Muscles</TabsTrigger>
                        <TabsTrigger value="modifications">Modifications</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="instructions" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">How to Perform</h4>
                          <ol className="space-y-2">
                            {exercise.instructions.map((instruction, index) => (
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
                      
                      <TabsContent value="muscles" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Primary Muscles</h4>
                          <div className="flex flex-wrap gap-2">
                            {exercise.muscles.map((muscle, index) => (
                              <Badge key={index} className="bg-blue-100 text-blue-800">
                                {muscle}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Equipment Required</h4>
                          <div className="flex flex-wrap gap-2">
                            {exercise.equipment.map((item, index) => (
                              <Badge key={index} variant="outline">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="modifications" className="space-y-4">
                        {exercise.hyperlaxity && (
                          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-amber-800 mb-1">Hyperlaxity Modification</h4>
                                <p className="text-sm text-amber-700">{exercise.modifications}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>

                  <DialogFooter>
                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Add to Workout
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No exercises found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Total Exercises</h3>
            <p className="text-2xl font-bold text-blue-600">{exercises.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Power Exercises</h3>
            <p className="text-2xl font-bold text-orange-600">
              {exercises.filter(ex => ex.type === 'Power').length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold mb-2">Hyperlaxity Adapted</h3>
            <p className="text-2xl font-bold text-amber-600">
              {exercises.filter(ex => ex.hyperlaxity).length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}