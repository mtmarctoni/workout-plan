import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface ScheduleHeaderProps {
  title: string;
  currentWeek: {
    phase: number;
    week: number;
    startDate: string;
    endDate: string;
  } | null;
  onNavigateCurrent: () => void;
  children?: React.ReactNode;
}

export function ScheduleHeader({
  title,
  currentWeek,
  onNavigateCurrent,
  children,
}: ScheduleHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <div className="flex items-center gap-4">
          {children}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNavigateCurrent}
            className="ml-2"
          >
            Current Week
          </Button>
        </div>
        {currentWeek && (
          <p className="text-gray-600 mt-1">
            Phase {currentWeek.phase} - Week {currentWeek.week} • {format(new Date(currentWeek.startDate), 'MMM d')} - {format(new Date(currentWeek.endDate), 'MMM d, yyyy')}
          </p>
        )}
      </div>
      <div className="flex gap-3 mt-4 md:mt-0">
        <Button onClick={onNavigateCurrent} variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Today
        </Button>
      </div>
    </div>
  );
}
