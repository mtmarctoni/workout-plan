import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, BookOpen, Play } from 'lucide-react';
import { Exercise } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import {ExerciseMedia} from '@/components/ExerciseMedia';

interface ExerciseDetailsDialogProps {
  exercise: Exercise;
}

export default function ExerciseDetailsDialog({ exercise }: ExerciseDetailsDialogProps) {
  return (
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
            {exercise.hasHyperlaxityMod && (
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            )}
          </DialogTitle>
          <DialogDescription>
            {exercise.category} • {exercise.level}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-video overflow-hidden rounded-lg">
            <ExerciseMedia
              videoUrl={exercise.videoUrl}
              imageUrl={exercise.imageUrl}
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
                  {exercise.muscleGroups.map((muscle, index) => (
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
              {exercise.hasHyperlaxityMod && exercise.hyperlaxityMod && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-1">Hyperlaxity Modification</h4>
                      <p className="text-sm text-amber-700">{exercise.hyperlaxityMod}</p>
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
  );
}
