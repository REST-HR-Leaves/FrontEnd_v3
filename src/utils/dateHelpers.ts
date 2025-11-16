export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculateDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end date
};

export const getHoursDifference = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return diffTime / (1000 * 60 * 60);
};

export const isUrgentLeave = (startDate: string, createdAt: string = new Date().toISOString()): boolean => {
  const hours = getHoursDifference(createdAt, startDate);
  return hours < 24;
};

export const toISOString = (date: Date): string => {
  return date.toISOString();
};
