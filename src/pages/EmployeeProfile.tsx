import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BalanceOverview } from '@/components/BalanceOverview';
import { employeesService, Employee } from '@/services/employeesService';
import { Loader } from '@/components/ui/Loader';
import { User, Mail, Briefcase, Building } from 'lucide-react';

const EmployeeProfile = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      employeesService.getEmployeeById(user.id)
        .then(setEmployee)
        .finally(() => setIsLoading(false));
    }
  }, [user?.id]);

  if (isLoading) {
    return <Loader className="py-8" />;
  }

  if (!employee) {
    return <div>Employee not found</div>;
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
              <p className="font-medium">{employee.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{employee.email}</p>
            </div>
          </div>
          {employee.position && (
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-medium">{employee.position}</p>
              </div>
            </div>
          )}
          {employee.department && (
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium">{employee.department}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-secondary">Leave Balance</h2>
        <BalanceOverview balance={employee.balance} />
      </div>
    </div>
  );
};

export default EmployeeProfile;
