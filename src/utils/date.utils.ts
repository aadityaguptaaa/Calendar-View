import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from "date-fns";

export const getCalendarGrid = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const days: Date[] = [];
  let d = new Date(gridStart);
  while (d <= gridEnd) {
    days.push(new Date(d));
    d = addDays(d, 1);
  }
  return days;
};
