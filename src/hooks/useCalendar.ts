// src/hooks/useCalendar.ts
import { useCallback, useState } from "react";

export type ViewMode = "month" | "week";

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [view, setView] = useState<ViewMode>("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }, []);

  // ✅ No redeclaration — this uses the same setView defined in useState above
  const handleSetView = useCallback((v: ViewMode) => {
    setView(v);
  }, []);

  return {
    currentDate,
    view,
    selectedDate,
    setSelectedDate,
    setView: handleSetView, // exported as setView for CalendarView
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  } as const;
};
