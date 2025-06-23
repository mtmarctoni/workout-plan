import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Timer, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Exercise = {
  id: string;
  name: string;
  description: string;
  equipment: string[];
  instructions: string[];
  category: string;
  type: string;
  defaultSets?: number;
  defaultReps?: string;
  defaultRestSeconds?: number;
};

type WorkoutOverviewProps = {
  exercises: Exercise[];
  focus: string;
};

export function WorkoutOverviewCard({ 
  exercises, 
  focus 
}: WorkoutOverviewProps) {
  // Check if workout requires outdoor space
  const requiresOutdoor = exercises.some(ex => 
    ['running', 'sprinting', 'sprints', 'jogging', 'park'].some(term => 
      ex.name.toLowerCase().includes(term) ||
      ex.description.toLowerCase().includes(term)
    )
  );

  // Get all unique equipment needed
  const allEquipment = Array.from(
    new Set(
      exercises.flatMap(ex => ex.equipment || [])
    )
  ).filter(Boolean);

  // Get workout type (strength, cardio, etc.)
  const workoutType = exercises.some(ex => ex.type === 'CARDIO') ? 'Cardio' : 'Strength';

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Summary</CardTitle>
        <Badge className="text-sm mr-auto">Focus: {focus}</Badge>
      </CardHeader>
      
      <CardContent>
        {requiresOutdoor && (
          <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md flex items-start gap-2">
            <MapPin className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-200">Outdoor Workout</h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This workout includes exercises that require outdoor space. Consider going to a park or open area.
              </p>
            </div>
          </div>
        )}

        {allEquipment.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              Equipment Needed:
            </h4>
            <div className="flex flex-wrap gap-2">
              {allEquipment.map((item, i) => (
                <Badge key={i} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h4 className="font-medium">Workout Plan:</h4>
          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div key={exercise.id} className="border-l-2 border-primary pl-4 py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium">{index + 1}. {exercise.name}</h5>
                    <p className="text-sm text-muted-foreground">
                      {exercise.defaultSets} × {exercise.defaultReps || '--'}
                      {exercise.defaultRestSeconds && ` • ${exercise.defaultRestSeconds}s rest`}
                    </p>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {exercise.equipment?.map((eq, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {eq}
                      </Badge>
                    ))}
                  </div>
                </div>
                {exercise.instructions && exercise.instructions.length > 0 && (
                  <details className="mt-1">
                    <summary className="text-sm text-muted-foreground cursor-pointer">
                      View instructions
                    </summary>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1 space-y-1">
                      {exercise.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
