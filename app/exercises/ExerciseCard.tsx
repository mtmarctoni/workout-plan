import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Exercise } from '@/lib/types';
import ExerciseDetailsDialog from './ExerciseDetailsDialog';
import { AlertTriangle, Target } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden">
        {exercise.imageUrl ? (
          <img 
            src={exercise.imageUrl} 
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{exercise.name}</CardTitle>
            <CardDescription>{exercise.category}</CardDescription>
          </div>
          {exercise.hasHyperlaxityMod && (
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
            <Target className="w-4 h-4 text-gray-400" />
            <span>{exercise.muscleGroups.join(', ')}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {exercise.equipment.map((item, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        <ExerciseDetailsDialog exercise={exercise} />
      </CardContent>
    </Card>
  );
}
