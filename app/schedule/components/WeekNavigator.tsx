import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface WeekNavigatorProps {
  phase: number;
  week: number;
  phases: Record<number, number[]>;
  isNavigating: boolean;
  onWeekChange: (direction: 'prev' | 'next') => void;
  onPhaseChange: (phase: number) => void;
  onWeekSelect: (week: number) => void;
  onGo: () => void;
}

export function WeekNavigator({
  phase,
  week,
  phases,
  isNavigating,
  onWeekChange,
  onPhaseChange,
  onWeekSelect,
  onGo,
}: WeekNavigatorProps) {
  return (
    <div className="flex gap-2 mt-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => onWeekChange('prev')}
        disabled={isNavigating || (phase === 1 && week === 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <select
        value={phase}
        onChange={(e) => onPhaseChange(parseInt(e.target.value))}
        className="text-sm border rounded-md p-1"
        disabled={isNavigating}
      >
        {Object.keys(phases).map((p) => (
          <option key={p} value={p}>
            Phase {p}
          </option>
        ))}
      </select>
      
      <select
        value={week}
        onChange={(e) => onWeekSelect(parseInt(e.target.value))}
        className="text-sm border rounded-md p-1"
        disabled={isNavigating || !phases[phase]}
      >
        {phases[phase]?.map((w) => (
          <option key={w} value={w}>
            Week {w}
          </option>
        )) || <option>Loading...</option>}
      </select>
      
      <Button 
        size="sm" 
        onClick={onGo}
        disabled={isNavigating}
        className="ml-2"
      >
        {isNavigating ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : null}
        Go
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => onWeekChange('next')}
        disabled={isNavigating || !phases[phase] || week >= Math.max(...phases[phase])}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
