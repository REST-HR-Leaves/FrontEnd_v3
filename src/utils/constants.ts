export const LEAVE_TYPES = {
  URGENT: 'urgent',
  NORMAL: 'normal',
} as const;

export const LEAVE_STATUS = {
  PENDING: 'pending',
  INITIAL_APPROVED: 'initial_approved',
  APPROVED: 'approved',
  REFUSED: 'refused',
} as const;

export const USER_ROLES = {
  EMPLOYEE: 'employee',
  HR: 'hr',
  MANAGER: 'manager',
} as const;

export const URGENT_THRESHOLD_HOURS = 24;
