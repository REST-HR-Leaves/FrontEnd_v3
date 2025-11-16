import { apiClient } from '@/utils/apiClient';
import { isUrgentLeave, calculateDaysBetween } from '@/utils/dateHelpers';
import { LEAVE_STATUS } from '@/utils/constants';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'urgent' | 'normal';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'initial_approved' | 'approved' | 'refused';
  createdAt: string;
  notes: string;
  urgentAuto: boolean;
}

export interface CreateLeaveData {
  type: 'urgent' | 'normal';
  startDate: string;
  endDate: string;
  notes?: string;
}

export const leavesService = {
  getLeaves: async (employeeId?: string): Promise<LeaveRequest[]> => {
    const endpoint = employeeId ? `/leaves?employeeId=${employeeId}` : '/leaves';
    return apiClient.get<LeaveRequest[]>(endpoint);
  },

  createLeaveRequest: async (data: CreateLeaveData): Promise<LeaveRequest> => {
    const createdAt = new Date().toISOString();
    const isUrgent = isUrgentLeave(data.startDate, createdAt);
    
    // Apply 24-hour urgent rule
    const requestData = {
      ...data,
      type: isUrgent ? 'urgent' : data.type,
      urgentAuto: isUrgent,
      days: calculateDaysBetween(data.startDate, data.endDate),
      status: LEAVE_STATUS.PENDING,
      createdAt,
    };

    return apiClient.post<LeaveRequest>('/leaves', requestData);
  },

  updateLeaveStatus: async (
    id: string,
    action: 'initial_approve' | 'manager_accept' | 'manager_refuse'
  ): Promise<LeaveRequest> => {
    let newStatus: string;
    
    switch (action) {
      case 'initial_approve':
        newStatus = LEAVE_STATUS.INITIAL_APPROVED;
        break;
      case 'manager_accept':
        newStatus = LEAVE_STATUS.APPROVED;
        break;
      case 'manager_refuse':
        newStatus = LEAVE_STATUS.REFUSED;
        break;
      default:
        throw new Error('Invalid action');
    }

    return apiClient.put<LeaveRequest>(`/leaves/${id}`, {
      status: newStatus,
      action,
    });
  },
};
