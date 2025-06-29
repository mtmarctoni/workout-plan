import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp } from 'lucide-react';

interface Milestone {
  title: string;
  description: string;
  timeAway: string;
  variant: 'blue' | 'orange' | 'green';
}

interface PhaseOverviewProps {
  phase: {
    currentWeek: number;
    totalWeeks: number;
    progress: number;
    completedWorkouts: number;
    remainingWorkouts: number;
    focusAreas: string[];
  };
  milestones: Milestone[];
}

export function PhaseOverview({ phase, milestones }: PhaseOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Phase Progress
          </CardTitle>
          <CardDescription>
            Power Development Phase Overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Week {phase.currentWeek} of {phase.totalWeeks}</span>
                <span>{phase.progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${phase.progress}%` }} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{phase.completedWorkouts}</div>
                <div className="text-xs text-gray-600">Workouts Completed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{phase.remainingWorkouts}</div>
                <div className="text-xs text-gray-600">Remaining</div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Focus Areas This Week</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {phase.focusAreas.map((area, index) => (
                  <li key={index}>• {area}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Upcoming Milestones
          </CardTitle>
          <CardDescription>
            Key assessments and phase transitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${
                  milestone.variant === 'blue' ? 'bg-blue-50' :
                  milestone.variant === 'orange' ? 'bg-orange-50' : 'bg-green-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${
                      milestone.variant === 'blue' ? 'text-blue-900' :
                      milestone.variant === 'orange' ? 'text-orange-900' : 'text-green-900'
                    }`}>
                      {milestone.title}
                    </h4>
                    <p className={`text-sm ${
                      milestone.variant === 'blue' ? 'text-blue-700' :
                      milestone.variant === 'orange' ? 'text-orange-700' : 'text-green-700'
                    }`}>
                      {milestone.description}
                    </p>
                  </div>
                  <Badge className={`${
                    milestone.variant === 'blue' ? 'bg-blue-100 text-blue-800' :
                    milestone.variant === 'orange' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {milestone.timeAway}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
