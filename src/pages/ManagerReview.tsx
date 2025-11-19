import { useEffect } from 'react';
import { useLeaves } from '@/context/LeavesContext';
import { LeaveCard } from '@/components/LeaveCard';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/Loader';
import { Check, X } from 'lucide-react';
import { LeaveRequest } from '@/services/leavesService';

// Static leave requests approved by HR for manager review
const staticReviewableLeaves: LeaveRequest[] = [
  {
    id: '4',
    employeeId: 'emp-2',
    employeeName: 'Samir',
    type: 'normal',
    startDate: '2025-01-25',
    endDate: '2025-01-27',
    days: 3,
    status: 'initial_approved',
    createdAt: '2025-01-20T11:00:00Z',
    notes: 'Personal matters',
    urgentAuto: false,
  },
  {
    id: '5',
    employeeId: 'emp-3',
    employeeName: 'Said',
    type: 'normal',
    startDate: '2025-02-10',
    endDate: '2025-02-14',
    days: 5,
    status: 'initial_approved',
    createdAt: '2025-01-28T09:30:00Z',
    notes: 'Vacation with family',
    urgentAuto: false,
  },
  {
    id: '6',
    employeeId: 'emp-4',
    employeeName: 'Eng Rawan',
    type: 'urgent',
    startDate: '2025-01-22',
    endDate: '2025-01-22',
    days: 1,
    status: 'initial_approved',
    createdAt: '2025-01-21T15:00:00Z',
    notes: 'Emergency personal issue',
    urgentAuto: true,
  },
];

const ManagerReview = () => {
  const { leaves, isLoading, fetchLeaves, updateLeaveStatus } = useLeaves();

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleAccept = async (id: string) => {
    // Static action - in real scenario, this would update the status
    console.log('Accept leave request:', id);
  };

  const handleRefuse = async (id: string) => {
    // Static action - in real scenario, this would update the status
    console.log('Refuse leave request:', id);
  };

  const reviewableLeaves = staticReviewableLeaves;

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
