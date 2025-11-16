import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLeaves } from '@/context/LeavesContext';
import { BalanceOverview } from '@/components/BalanceOverview';
import { LeaveCard } from '@/components/LeaveCard';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/Loader';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { employeesService } from '@/services/employeesService';

const Dashboard = () => {
  const { user } = useAuth();
  const { leaves, isLoading, fetchLeaves } = useLeaves();
  const navigate = useNavigate();
  const [balance, setBalance] = useState({ urgentDays: 0, normalDays: 0 });

  useEffect(() => {
    if (user?.id) {
      fetchLeaves(user.id);
      employeesService.getLeaveBalances(user.id).then(setBalance);
    }
  }, [user?.id]);

  const myLeaves = leaves.filter(leave => leave.employeeId === user?.id);

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
        {isLoading ? (
          <Loader className="py-8" />
        ) : myLeaves.length === 0 ? (
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
