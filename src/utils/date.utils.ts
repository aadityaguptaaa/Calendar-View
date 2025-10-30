// src/utils/date.utils.ts
/**
 * Date utilities used by MonthView and WeekView
 * No dependencies (no date-fns) — all plain JS Date
 */

// ✅ Basic comparison helpers
export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isSameMinute = (a: Date, b: Date): boolean =>
  isSameDay(a, b) && a.getHours() === b.getHours() && a.getMinutes() === b.getMinutes();

// ✅ Month boundaries
export const startOfMonth = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), 1);
export const endOfMonth = (d: Date): Date => new Date(d.getFullYear(), d.getMonth() + 1, 0);

// ✅ Week helpers
export const startOfWeek = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const addDays = (date: Date, n: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

// ✅ Time setters
export const setHours = (date: Date, hours: number): Date => {
  const d = new Date(date);
  d.setHours(hours);
  return d;
};

export const setMinutes = (date: Date, minutes: number): Date => {
  const d = new Date(date);
  d.setMinutes(minutes);
  return d;
};

// ✅ Grid + week generation
export const getCalendarGrid = (current: Date): Date[] => {
  const firstOfMonth = startOfMonth(current);
  const start = new Date(firstOfMonth);
  start.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());
  const grid: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    grid.push(d);
  }
  return grid;
};

export const getWeekRange = (d: Date): Date[] => {
  const start = new Date(d);
  start.setDate(d.getDate() - d.getDay());
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day);
  }
  return days;
};

// ✅ Misc helpers
export const toMinutes = (date: Date): number => date.getHours() * 60 + date.getMinutes();
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
export const rangesOverlap = (aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) =>
  aStart < bEnd && bStart < aEnd;
