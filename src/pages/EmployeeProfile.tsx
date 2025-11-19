import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BalanceOverview } from '@/components/BalanceOverview';
import { User, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const EmployeeProfile = () => {
  const { user } = useAuth();

  // Default balance - can be made dynamic later
  const defaultBalance = {
    urgentDays: 5,
    normalDays: 15,
  };

  if (!user) {
    return <div>Please log in to view your profile</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary">My Profile</h1>
        <p className="text-muted-foreground">View your personal information and leave balance</p>
      </div>

      <Card className="shadow-lg border-secondary/20">
        <CardHeader>
          <CardTitle className="text-secondary">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Leave Balance</h2>
        <BalanceOverview balance={defaultBalance} />
      </div>
    </div>
  );
};

export default EmployeeProfile;
