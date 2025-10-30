// src/utils/event.utils.ts
import { CalendarEvent } from "../components/Calendar/CalendarView.types";
import { isSameDay } from "./date.utils";

/** 🕓 Convert Date to minutes since midnight */
const toMinutes = (d: Date): number => d.getHours() * 60 + d.getMinutes();

/** ✅ Sort events by start time (earliest first) */
export const sortEvents = (events: CalendarEvent[]): CalendarEvent[] =>
  [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

/** ✅ Also export alias for WeekView backward compatibility */
export const sortEventsByTime = sortEvents;

/** ✅ Return all events that occur on a specific day */
export const eventsForDay = (events: CalendarEvent[], day: Date): CalendarEvent[] =>
  events.filter((e) => isSameDay(e.startDate, day));

/** ✅ Alias for eventsForDay (used by MonthView) */
export const eventsOnDay = (events: CalendarEvent[], day: Date): CalendarEvent[] =>
  eventsForDay(events, day);

/** ✅ Compute event duration in minutes */
export const eventDurationMinutes = (evt: CalendarEvent): number =>
  Math.max(0, Math.floor((evt.endDate.getTime() - evt.startDate.getTime()) / (1000 * 60)));

/** ✅ Group events by day (YYYY-M-D) */
export const groupEventsByDay = (events: CalendarEvent[]): Record<string, CalendarEvent[]> => {
  const map: Record<string, CalendarEvent[]> = {};
  events.forEach((e) => {
    const d = e.startDate;
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!map[key]) map[key] = [];
    map[key].push(e);
  });

  // Sort each day's events
  Object.keys(map).forEach((k) => {
    map[k].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  });

  return map;
};

/** ✅ Compare events by minute precision (used in WeekView layout) */
export const compareByStartMinute = (a: CalendarEvent, b: CalendarEvent): number =>
  toMinutes(a.startDate) - toMinutes(b.startDate);
