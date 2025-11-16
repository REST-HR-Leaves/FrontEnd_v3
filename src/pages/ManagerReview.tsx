import { useEffect } from 'react';
import { useLeaves } from '@/context/LeavesContext';
import { LeaveCard } from '@/components/LeaveCard';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/Loader';
import { Check, X } from 'lucide-react';

const ManagerReview = () => {
  const { leaves, isLoading, fetchLeaves, updateLeaveStatus } = useLeaves();

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleAccept = async (id: string) => {
    await updateLeaveStatus(id, 'manager_accept');
  };

  const handleRefuse = async (id: string) => {
    await updateLeaveStatus(id, 'manager_refuse');
  };

  const reviewableLeaves = leaves.filter(leave => leave.status === 'initial_approved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary">Manager Review</h1>
        <p className="text-muted-foreground">
          Review leave requests approved by HR
        </p>
      </div>

      {isLoading ? (
        <Loader className="py-8" />
      ) : reviewableLeaves.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No requests awaiting your review
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviewableLeaves.map((leave) => (
            <LeaveCard
              key={leave.id}
              leave={leave}
              actions={
                <>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleAccept(leave.id)}
                    className="bg-success hover:bg-success/90"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRefuse(leave.id)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Refuse
                  </Button>
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerReview;
