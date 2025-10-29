import type { CalendarEvent } from "../components/Calendar/CalendarView.types";

/**
 * Utility to create a new calendar event
 */
export const createEvent = (opts: {
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  color?: string;
  category?: string;
}): CalendarEvent => ({
  id: `evt-${Date.now()}`,
  title: opts.title,
  description: opts.description ?? "",
  startDate: opts.startDate,
  endDate: opts.endDate ?? opts.startDate,
  color: opts.color ?? "#3b82f6", // default blue
  category: opts.category ?? "General",
});

/**
 * Update an existing event by id
 */
export const updateEvent = (
  events: CalendarEvent[],
  id: string,
  updates: Partial<CalendarEvent>
): CalendarEvent[] => {
  return events.map((event) =>
    event.id === id ? { ...event, ...updates } : event
  );
};

/**
 * Delete an event by id
 */
export const deleteEvent = (
  events: CalendarEvent[],
  id: string
): CalendarEvent[] => events.filter((event) => event.id !== id);
