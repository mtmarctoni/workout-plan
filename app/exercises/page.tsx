"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Filter, Loader2 } from 'lucide-react';
import { getExercises } from './actions';
import ExerciseFilters from './ExerciseFilters';
import ExerciseCard from './ExerciseCard';
import ExerciseStats from './ExerciseStats';
import { type Exercise, type FilterOption } from '@/lib/types';

// Constants moved to separate section
const CATEGORIES: FilterOption[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'Mobility', label: 'Mobility' },
  { value: 'Upper_Strength', label: 'Upper Body Power' },
  { value: 'Lower_Strength', label: 'Lower Body Power' },
  { value: 'Core', label: 'Core' },
  { value: 'Agility', label: 'Agility' },
  { value: 'Conditioning', label: 'Conditioning' },

];

const EQUIPMENT_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Equipment' },
  { value: 'Bench', label: 'Bench' },
  { value: 'Dumbbell', label: 'Dumbbell' },
  { value: 'Kettlebell', label: 'Kettlebell' },
  { value: 'Medicine Ball', label: 'Medicine Ball' },
  { value: 'Pull-up Bar', label: 'Pull-up Bar' },
  { value: 'Stability Ball', label: 'Stability Ball' },
  { value: 'Cones', label: 'Cones' },
  { value: 'Rack', label: 'Rack' },
  { value: 'None', label: 'Bodyweight Only' },
  { value: 'Mat', label: 'Mat' },
  { value: 'Resistance Bands', label: 'Resistance Bands' },
  { value: 'Box', label: 'Box' },
];

const LEVEL_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Levels' },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
        setFilteredExercises(data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExercises();
  }, []);

  useEffect(() => {
    let result = [...exercises];
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(exercise => 
        exercise.name.toLowerCase().includes(searchLower) ||
        exercise.description.toLowerCase().includes(searchLower) ||
        exercise.muscleGroups.some(mg => mg.toLowerCase().includes(searchLower))
      );
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter(exercise => 
        exercise.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    if (selectedEquipment !== 'all') {
      result = result.filter(exercise => 
        exercise.equipment.some(eq => eq.toLowerCase() === selectedEquipment.toLowerCase())
      );
    }
    
    if (selectedLevel !== 'all') {
      result = result.filter(exercise => 
        exercise.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }
    
    setFilteredExercises(result);
  }, [searchTerm, selectedCategory, selectedEquipment, selectedLevel, exercises]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading exercises...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Exercise Library</h1>
        <p className="text-gray-600">
          Comprehensive collection of handball-specific exercises
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Exercises
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExerciseFilters
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedEquipment={selectedEquipment}
            selectedLevel={selectedLevel}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onEquipmentChange={setSelectedEquipment}
            onLevelChange={setSelectedLevel}
            categories={CATEGORIES}
            equipmentOptions={EQUIPMENT_OPTIONS}
            levelOptions={LEVEL_OPTIONS}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
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

      <ExerciseStats exercises={exercises} />
    </div>
  );
}
