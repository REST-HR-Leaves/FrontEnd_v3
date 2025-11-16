export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateLeaveRequest = (data: {
  startDate: string;
  endDate: string;
  type: string;
  notes?: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.startDate) {
    errors.push('Start date is required');
  }
  
  if (!data.endDate) {
    errors.push('End date is required');
  }
  
  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    
    if (end < start) {
      errors.push('End date must be after start date');
    }
  }
  
  if (!data.type) {
    errors.push('Leave type is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
};
