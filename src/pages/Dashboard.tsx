import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { BalanceOverview } from '@/components/BalanceOverview';
import { LeaveCard } from '@/components/LeaveCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LeaveRequest } from '@/services/leavesService';

// Static leave requests data for employee
const staticLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: 'emp-1',
    employeeName: 'Maha',
    type: 'normal',
    startDate: '2025-01-15',
    endDate: '2025-01-17',
    days: 3,
    status: 'approved',
    createdAt: '2025-01-10T10:00:00Z',
    notes: 'Family vacation',
    urgentAuto: false,
  },
  {
    id: '2',
    employeeId: 'emp-1',
    employeeName: 'Maha',
    type: 'urgent',
    startDate: '2025-01-20',
    endDate: '2025-01-20',
    days: 1,
    status: 'pending',
    createdAt: '2025-01-19T14:30:00Z',
    notes: 'Medical appointment',
    urgentAuto: true,
  },
  {
    id: '3',
    employeeId: 'emp-1',
    employeeName: 'Maha',
    type: 'normal',
    startDate: '2025-02-01',
    endDate: '2025-02-05',
    days: 5,
    status: 'initial_approved',
    createdAt: '2025-01-25T09:00:00Z',
    notes: 'Personal leave',
    urgentAuto: false,
  },
];

// Static balance data
const staticBalance = { urgentDays: 5, normalDays: 15 };

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [balance] = useState(staticBalance);

  // Use the logged-in user's name for displaying leave cards
  const myLeaves = staticLeaveRequests.map((leave) => ({
    ...leave,
    employeeName: user?.name ?? leave.employeeName,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Button onClick={() => navigate('/leave-request')}>
          <Plus className="mr-2 h-4 w-4" />
          New Leave Request
        </Button>
      </div>

      <BalanceOverview balance={balance} />

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-secondary">My Leave Requests</h2>
        {myLeaves.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No leave requests yet. Create your first one!
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {myLeaves.map((leave) => (
              <LeaveCard key={leave.id} leave={leave} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
