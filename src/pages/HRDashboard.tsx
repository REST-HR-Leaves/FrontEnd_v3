import { useState } from 'react';
import { LeaveCard } from '@/components/LeaveCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X } from 'lucide-react';
import { LeaveRequest } from '@/services/leavesService';

// Static leave requests data for HR
const staticAllLeaves: LeaveRequest[] = [
  {
    id: '7',
    employeeId: 'emp-5',
    employeeName: 'Eng Fady',
    type: 'normal',
    startDate: '2025-02-05',
    endDate: '2025-02-07',
    days: 3,
    status: 'pending',
    createdAt: '2025-01-30T10:00:00Z',
    notes: 'Personal leave',
    urgentAuto: false,
  },
  {
    id: '8',
    employeeId: 'emp-6',
    employeeName: 'Saber',
    type: 'urgent',
    startDate: '2025-01-23',
    endDate: '2025-01-23',
    days: 1,
    status: 'pending',
    createdAt: '2025-01-22T16:00:00Z',
    notes: 'Medical emergency',
    urgentAuto: true,
  },
  {
    id: '9',
    employeeId: 'emp-1',
    employeeName: 'Maha',
    type: 'normal',
    startDate: '2025-02-15',
    endDate: '2025-02-19',
    days: 5,
    status: 'pending',
    createdAt: '2025-02-01T09:00:00Z',
    notes: 'Family vacation',
    urgentAuto: false,
  },
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
    id: '10',
    employeeId: 'emp-4',
    employeeName: 'Eng Rawan',
    type: 'normal',
    startDate: '2025-01-12',
    endDate: '2025-01-14',
    days: 3,
    status: 'approved',
    createdAt: '2025-01-05T08:00:00Z',
    notes: 'Personal time off',
    urgentAuto: false,
  },
];

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const handleInitialApprove = async (id: string) => {
    // Static action - in real scenario, this would update the status
    console.log('Approve leave request:', id);
  };

  const handleRefuse = async (id: string) => {
    // Static action - in real scenario, this would update the status
    console.log('Refuse leave request:', id);
  };

  const pendingLeaves = staticAllLeaves.filter(leave => leave.status === 'pending');
  const approvedLeaves = staticAllLeaves.filter(leave => leave.status === 'initial_approved');
  const allLeaves = staticAllLeaves;

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
            All Requests ({allLeaves.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingLeaves.length === 0 ? (
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
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleInitialApprove(leave.id)}
                        className="bg-success hover:bg-success/90"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Approve
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
          {allLeaves.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No leave requests
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {allLeaves.map((leave) => (
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
