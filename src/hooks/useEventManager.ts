import { useCallback, useEffect, useState } from "react";
import { CalendarEvent } from "../components/Calendar/CalendarView.types";

const STORAGE_KEY = "calendar_events_v2";

export const useEventManager = (initial: CalendarEvent[] = []) => {
  // ───────────────────────────────
  // 🧠 Load events from localStorage on init
  // ───────────────────────────────
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Revive date strings back to Date objects
          return parsed.map((e: any) => ({
            ...e,
            startDate: new Date(e.startDate),
            endDate: new Date(e.endDate),
          })) as CalendarEvent[];
        }
      }
    } catch (err) {
      console.warn("Failed to load events:", err);
    }
    return initial;
  });

  // ───────────────────────────────
  // 💾 Auto-save to localStorage
  // ───────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (err) {
      console.warn("Failed to save events:", err);
    }
  }, [events]);

  // ───────────────────────────────
  // ➕ Add Event
  // ───────────────────────────────
  const addEvent = useCallback((evt: CalendarEvent) => {
    setEvents((prev) => [...prev, evt]);
  }, []);

  // ───────────────────────────────
  // 🔄 Update Event
  // ───────────────────────────────
  const updateEvent = useCallback(
    (id: string, updates: Partial<CalendarEvent>) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
      );
    },
    []
  );

  // ───────────────────────────────
  // ❌ Delete Event
  // ───────────────────────────────
  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // ───────────────────────────────
  // 🧩 Move Event (drag-and-drop)
  // ───────────────────────────────
  const moveEvent = useCallback(
    (id: string, newStart: Date, newEnd: Date) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                startDate: newStart,
                endDate: newEnd,
              }
            : e
        )
      );
    },
    []
  );

  // ───────────────────────────────
  // 🔁 Replace All Events (reset)
  // ───────────────────────────────
  const replaceAll = useCallback((next: CalendarEvent[]) => {
    setEvents(next);
  }, []);

  // ───────────────────────────────
  // ✅ Exported API
  // ───────────────────────────────
  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    moveEvent,
    replaceAll,
  } as const;
};
