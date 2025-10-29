import { useState, useCallback } from "react";

export type ViewMode = "month" | "week";

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [view, setView] = useState<ViewMode>("month");

  const goToNextMonth = useCallback(() => {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, []);

  const goToToday = useCallback(() => setCurrentDate(new Date()), []);
  const setViewMode = useCallback((v: ViewMode) => setView(v), []);

  return { currentDate, view, setViewMode, goToNextMonth, goToPreviousMonth, goToToday };
};
