import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'pending' | 'initial_approved' | 'approved' | 'refused';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variants = {
    pending: { variant: 'outline' as const, label: 'Pending' },
    initial_approved: { variant: 'secondary' as const, label: 'HR Approved' },
    approved: { variant: 'default' as const, label: 'Approved' },
    refused: { variant: 'destructive' as const, label: 'Refused' },
  };

  const config = variants[status];

  return (
    <Badge variant={config.variant} className={
      status === 'approved' ? 'bg-success text-success-foreground' :
      status === 'initial_approved' ? 'bg-warning text-warning-foreground' : ''
    }>
      {config.label}
    </Badge>
  );
};
