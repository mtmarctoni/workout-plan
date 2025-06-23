import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExerciseMedia } from './ExerciseMedia';
import { Badge } from '@/components/ui/badge';
import { Zap, AlertTriangle } from 'lucide-react';
import { ExerciseType } from '@/lib/types';

interface Props {
  exercise: any;
  completedSets: Record<number, number>;
  currentExerciseIdx: number;
  numOfExercises: number;
  exerciseVideoUrl: string;
  exerciseName: string;
  exerciseSets: number;
  exerciseReps: string;
  exerciseRestSeconds: number;
  exerciseEquipment: string[];
  exerciseInstructions: string[];
  hasHyperlaxityMod: boolean;
  hyperlaxityMod: string;
}

export default function CurrentExerciseCard({ 
  exercise,
  completedSets,
  currentExerciseIdx,
  numOfExercises,
  exerciseVideoUrl,
  exerciseName,
  exerciseSets,
  exerciseReps,
  exerciseRestSeconds,
  exerciseEquipment,
  exerciseInstructions,
  hasHyperlaxityMod,
  hyperlaxityMod,
}: Props) {
  // Helper function for exercise type styling
  const getTypeBadgeClass = (type: ExerciseType) => {
    switch(type) {
      case ExerciseType.POWER: return 'bg-orange-100 text-orange-800';
      case ExerciseType.STRENGTH: return 'bg-blue-100 text-blue-800';
      case ExerciseType.AGILITY: return 'bg-green-100 text-green-800';
      case ExerciseType.RECOVERY: return 'bg-purple-100 text-purple-800';
      case ExerciseType.COMPETITION: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  console.log(exercise)

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              {exerciseName}
            </CardTitle>
            <CardDescription>
              Exercise {currentExerciseIdx + 1} of {numOfExercises}
            </CardDescription>
          </div>
          <Badge className={getTypeBadgeClass(exercise.exercise.type)}>
            {exercise.exercise.type}
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
                <ExerciseMedia 
                  videoUrl={exerciseVideoUrl}
                  imageUrl={exercise.imageUrl}
                  alt={exerciseName}
                />

                {/* Exercise Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{exerciseSets}</p>
                    <p className="text-sm text-gray-600">Sets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{exerciseReps}</p>
                    <p className="text-sm text-gray-600">Reps</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">{exerciseRestSeconds}s</p>
                    <p className="text-sm text-gray-600">Rest</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {completedSets[currentExerciseIdx ?? 0] || 0}
                    </p>
                    <p className="text-sm text-gray-600">Complete</p>
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h4 className="font-medium mb-2">Equipment Needed</h4>
                  <div className="flex flex-wrap gap-2">
                    {exerciseEquipment.length > 0 ? (
                      exerciseEquipment.map((item: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {item}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">No equipment needed</span>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="modifications" className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-1">Hyperlaxity Modification</h4>
                      <p className="text-sm text-amber-700">
                        {hasHyperlaxityMod ? hyperlaxityMod : "No modification available"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="form" className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Step-by-Step Instructions</h4>
                  <ol className="space-y-2">
                    {exerciseInstructions.length > 0 ? (
                      exerciseInstructions.map((instruction: string, index: number) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-sm">{instruction}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500">No instructions available</li>
                    )}
                  </ol>
                </div>
              </TabsContent>
            </Tabs>
      </CardContent>
    </Card>
  );
}
