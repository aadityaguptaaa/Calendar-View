import { useState, useCallback } from "react";
import type { CalendarEvent } from "../components/Calendar/CalendarView";

export const useEventManager = (initial: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initial);

  const addEvent = useCallback((evt: CalendarEvent) => {
    setEvents(prev => [...prev, evt]);
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  return { events, addEvent, updateEvent, deleteEvent, setEvents };
};
