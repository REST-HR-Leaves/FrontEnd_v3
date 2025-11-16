import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, AlertCircle } from 'lucide-react';

interface BalanceOverviewProps {
  balance: {
    urgentDays: number;
    normalDays: number;
  };
}

export const BalanceOverview = ({ balance }: BalanceOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="shadow-lg border-secondary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Normal Leave</CardTitle>
          <Calendar className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">{balance.normalDays}</div>
          <p className="text-xs text-muted-foreground">Days remaining</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg border-secondary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Urgent Leave</CardTitle>
          <AlertCircle className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">{balance.urgentDays}</div>
          <p className="text-xs text-muted-foreground">Days remaining</p>
        </CardContent>
      </Card>
    </div>
  );
};
