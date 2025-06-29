import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Zap, Heart } from 'lucide-react';
import { Exercise } from '@/lib/types';

interface ExerciseStatsProps {
  exercises: Exercise[];
}

export default function ExerciseStats({ exercises }: ExerciseStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            {exercises.filter(ex => ex.hasHyperlaxityMod).length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
