import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, CheckCircle, Loader2, Target } from 'lucide-react';

interface Stats {
  totalWorkouts: number;
  completed: number;
  scheduled: number;
  inProgress: number;
  totalDuration: number;
}

interface StatsGridProps {
  stats: Stats;
}

const StatCard = ({ 
  title, 
  value, 
  icon 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode 
}) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-gray-100">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <StatCard 
        title="Total Workouts" 
        value={stats.totalWorkouts} 
        icon={<Calendar className="w-5 h-5" />} 
      />
      <StatCard 
        title="Completed" 
        value={stats.completed} 
        icon={<CheckCircle className="w-5 h-5 text-green-500" />} 
      />
      <StatCard 
        title="Scheduled" 
        value={stats.scheduled} 
        icon={<Calendar className="w-5 h-5 text-blue-500" />} 
      />
      <StatCard 
        title="In Progress" 
        value={stats.inProgress} 
        icon={<Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />} 
      />
      <StatCard 
        title="Total Duration" 
        value={`${Math.floor(stats.totalDuration / 60)}h ${stats.totalDuration % 60}m`} 
        icon={<Clock className="w-5 h-5 text-purple-500" />} 
      />
    </div>
  );
}
