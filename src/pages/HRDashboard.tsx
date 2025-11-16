import { useEffect, useState } from 'react';
import { useLeaves } from '@/context/LeavesContext';
import { LeaveCard } from '@/components/LeaveCard';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/Loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';

const HRDashboard = () => {
  const { leaves, isLoading, fetchLeaves, updateLeaveStatus } = useLeaves();
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleInitialApprove = async (id: string) => {
    await updateLeaveStatus(id, 'initial_approve');
  };

  const pendingLeaves = leaves.filter(leave => leave.status === 'pending');
  const approvedLeaves = leaves.filter(leave => leave.status === 'initial_approved');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary">HR Dashboard</h1>
        <p className="text-muted-foreground">Review and approve leave requests</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingLeaves.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            HR Approved ({approvedLeaves.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All Requests ({leaves.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {isLoading ? (
            <Loader className="py-8" />
          ) : pendingLeaves.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No pending requests
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {pendingLeaves.map((leave) => (
                <LeaveCard
                  key={leave.id}
                  leave={leave}
                  actions={
                    <Button
                      size="sm"
                      onClick={() => handleInitialApprove(leave.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  }
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedLeaves.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No approved requests awaiting manager review
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {approvedLeaves.map((leave) => (
                <LeaveCard key={leave.id} leave={leave} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {leaves.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No leave requests
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {leaves.map((leave) => (
                <LeaveCard key={leave.id} leave={leave} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRDashboard;
