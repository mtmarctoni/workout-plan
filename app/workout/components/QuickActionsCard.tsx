import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Button variant="secondary" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Adjust Rest Timer
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            Exercise Info
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
