import { apiClient } from '@/utils/apiClient';

export interface LeaveBalance {
  urgentDays: number;
  normalDays: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  position?: string;
  balance: LeaveBalance;
}

export const employeesService = {
  getLeaveBalances: async (employeeId: string): Promise<LeaveBalance> => {
    const response = await apiClient.get<{ balance: LeaveBalance }>(
      `/employees/${employeeId}/balance`
    );
    return response.balance;
  },

  getEmployeeById: async (id: string): Promise<Employee> => {
    return apiClient.get<Employee>(`/employees/${id}`);
  },
};
