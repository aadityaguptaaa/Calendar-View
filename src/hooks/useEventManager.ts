import { useState } from "react";
import { CalendarEvent } from "../components/Calendar/CalendarView.types";

export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = (event: CalendarEvent) => setEvents(prev => [...prev, event]);

  const updateEvent = (id: string, updates: Partial<CalendarEvent>) =>
    setEvents(prev =>
      prev.map(evt => (evt.id === id ? { ...evt, ...updates } : evt))
    );

  const deleteEvent = (id: string) =>
    setEvents(prev => prev.filter(evt => evt.id !== id));

  return { events, addEvent, updateEvent, deleteEvent };
};
