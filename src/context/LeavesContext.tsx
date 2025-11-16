import React, { createContext, useContext, useState, ReactNode } from 'react';
import { leavesService, LeaveRequest, CreateLeaveData } from '@/services/leavesService';
import { toast } from 'sonner';

interface LeavesContextType {
  leaves: LeaveRequest[];
  isLoading: boolean;
  fetchLeaves: (employeeId?: string) => Promise<void>;
  createLeave: (data: CreateLeaveData) => Promise<void>;
  updateLeaveStatus: (id: string, action: 'initial_approve' | 'manager_accept' | 'manager_refuse') => Promise<void>;
}

const LeavesContext = createContext<LeavesContextType | undefined>(undefined);

export const LeavesProvider = ({ children }: { children: ReactNode }) => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeaves = async (employeeId?: string) => {
    setIsLoading(true);
    try {
      const data = await leavesService.getLeaves(employeeId);
      setLeaves(data);
    } catch (error) {
      toast.error('Failed to fetch leave requests');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createLeave = async (data: CreateLeaveData) => {
    setIsLoading(true);
    try {
      const newLeave = await leavesService.createLeaveRequest(data);
      setLeaves((prev) => [newLeave, ...prev]);
      toast.success('Leave request submitted successfully');
    } catch (error) {
      toast.error('Failed to create leave request');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeaveStatus = async (
    id: string,
    action: 'initial_approve' | 'manager_accept' | 'manager_refuse'
  ) => {
    setIsLoading(true);
    try {
      const updatedLeave = await leavesService.updateLeaveStatus(id, action);
      setLeaves((prev) =>
        prev.map((leave) => (leave.id === id ? updatedLeave : leave))
      );
      
      const actionMessages = {
        initial_approve: 'Leave request approved by HR',
        manager_accept: 'Leave request approved',
        manager_refuse: 'Leave request refused',
      };
      
      toast.success(actionMessages[action]);
    } catch (error) {
      toast.error('Failed to update leave status');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LeavesContext.Provider
      value={{
        leaves,
        isLoading,
        fetchLeaves,
        createLeave,
        updateLeaveStatus,
      }}
    >
      {children}
    </LeavesContext.Provider>
  );
};

export const useLeaves = () => {
  const context = useContext(LeavesContext);
  if (context === undefined) {
    throw new Error('useLeaves must be used within a LeavesProvider');
  }
  return context;
};
