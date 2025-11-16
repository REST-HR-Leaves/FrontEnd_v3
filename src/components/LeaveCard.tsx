import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/dateHelpers';
import { Calendar, Clock, User } from 'lucide-react';

interface LeaveCardProps {
  leave: {
    id: string;
    employeeName: string;
    type: 'urgent' | 'normal';
    startDate: string;
    endDate: string;
    days: number;
    status: 'pending' | 'initial_approved' | 'approved' | 'refused';
    notes: string;
    urgentAuto?: boolean;
  };
  actions?: React.ReactNode;
}

export const LeaveCard = ({ leave, actions }: LeaveCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow shadow-lg border-secondary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-secondary" />
              <CardTitle className="text-lg text-foreground">{leave.employeeName}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={leave.status} />
              <Badge variant={leave.type === 'urgent' ? 'destructive' : 'secondary'} className="bg-muted text-foreground">
                {leave.type === 'urgent' ? 'Urgent' : 'Normal'}
              </Badge>
              {leave.urgentAuto && (
                <Badge variant="outline" className="text-xs border-warning text-warning">
                  Auto-detected
                </Badge>
              )}
            </div>
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar className="h-4 w-4 text-secondary" />
          <span>
            {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Clock className="h-4 w-4 text-secondary" />
          <span>{leave.days} {leave.days === 1 ? 'day' : 'days'}</span>
        </div>
        {leave.notes && (
          <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">
            {leave.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
