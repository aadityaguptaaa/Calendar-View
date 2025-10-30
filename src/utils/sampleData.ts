// src/utils/sampleData.ts
import { CalendarEvent } from '../components/Calendar/CalendarView.types';

const mk = (y: number, m: number, d: number, h = 9, min = 0, durMins = 60): CalendarEvent => {
  const start = new Date(y, m, d, h, min);
  const end = new Date(start.getTime() + durMins * 60 * 1000);
  return {
    id: `evt-${start.getTime()}`,
    title: `Event ${d} ${h}:${String(min).padStart(2, '0')}`,
    description: `Sample event for ${start.toDateString()}`,
    startDate: start,
    endDate: end,
    color: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][d % 4],
    category: d % 2 ? 'Work' : 'Personal',
  };
};

export const sampleEvents: CalendarEvent[] = [
  mk(2024, 0, 15, 9, 0, 30),
  mk(2024, 0, 15, 14, 0, 90),
  mk(2024, 0, 16, 10, 0, 90),
  mk(2024, 0, 17, 9, 0, 60),
  mk(2024, 0, 20, 13, 30, 120),
  mk(2024, 0, 23, 8, 0, 60),
  // a multi-day event example (start/end across days)
  {
    id: 'evt-multi',
    title: 'Multi day',
    description: 'Spans two days',
    startDate: new Date(2024, 0, 25, 18, 0),
    endDate: new Date(2024, 0, 26, 10, 0),
    color: '#ef4444',
    category: 'Travel',
  },
];
