// src/components/Calendar/MonthView.tsx

import React, { useState, useCallback, useEffect } from "react";
import CalendarCell from "./CalendarCell";
import Tooltip from "./Tooltip";
import { CalendarEvent } from "./CalendarView.types";
import { getCalendarGrid, addDays, isSameDay } from "../../utils/date.utils";
import { eventsOnDay } from "../../utils/event.utils";

interface MonthViewProps {
  currentDate: Date;
  selectedDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  onCreateEvent: (start: Date, end: Date) => void;
  onEditEvent: (event: CalendarEvent) => void;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  selectedDate,
  events,
  onSelectDate,
  onCreateEvent,
  onEditEvent,
}) => {
  const grid = getCalendarGrid(currentDate);
  const today = new Date();

  const [focusedDate, setFocusedDate] = useState<Date>(selectedDate);
  const [multiSelectStart, setMultiSelectStart] = useState<Date | null>(null);
  const [multiSelectEnd, setMultiSelectEnd] = useState<Date | null>(null);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  // Helper function to round the time up to the nearest half-hour
  const getRoundedTime = (date: Date): Date => {
    const newDate = new Date(date);
    const minutes = newDate.getMinutes();
    let hour = newDate.getHours();

    if (minutes > 30) {
      // Round up to the next hour
      newDate.setHours(hour + 1, 0, 0, 0);
    } else if (minutes > 0) {
      // Round up to the half-hour
      newDate.setMinutes(30, 0, 0);
    } else {
      // Already on the hour
      newDate.setMinutes(0, 0, 0);
    }
    return newDate;
  };

  // ─────────────── Keyboard navigation ───────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      let newDate = new Date(focusedDate);
      switch (e.key) {
        case "ArrowRight":
          newDate = addDays(focusedDate, 1);
          break;
        case "ArrowLeft":
          newDate = addDays(focusedDate, -1);
          break;
        case "ArrowUp":
          newDate = addDays(focusedDate, -7);
          break;
        case "ArrowDown":
          newDate = addDays(focusedDate, 7);
          break;
        case "Enter":
        case " ":
          onSelectDate(focusedDate);
          {
            // Default to 9:00 AM for consistency
            const accurateStart = new Date(
              focusedDate.getFullYear(),
              focusedDate.getMonth(),
              focusedDate.getDate(),
              9, 
              0,
              0,
              0
            );
            const accurateEnd = new Date(accurateStart.getTime() + 60 * 60 * 1000);
            onCreateEvent(accurateStart, accurateEnd);
          }
          break;
        case "Escape":
          setFocusedDate(selectedDate);
          break;
      }
      setFocusedDate(newDate);
    },
    [focusedDate, selectedDate, onCreateEvent, onSelectDate]
  );

  // ─────────────── Shift handling ───────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftHeld(e.type === "keydown");
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
    };
  }, []);

  // ─────────────── Range Highlight ───────────────
  const isInRange = (date: Date) => {
    if (!multiSelectStart || !multiSelectEnd) return false;
    const start = multiSelectStart < multiSelectEnd ? multiSelectStart : multiSelectEnd;
    const end = multiSelectEnd > multiSelectStart ? multiSelectEnd : multiSelectStart;
    return date >= start && date <= end;
  };

  // ─────────────── Handle Mouse Click ───────────────
  const handleDayClick = (date: Date, e: React.MouseEvent<HTMLDivElement>) => {
    if (shiftHeld) {
      if (!multiSelectStart) setMultiSelectStart(date);
      else setMultiSelectEnd(date);
      return;
    }

    onSelectDate(date);

    let initialStart: Date;

    if (isSameDay(date, today)) {
        // If clicking today, use the current time rounded to the nearest half-hour
        initialStart = getRoundedTime(new Date());
    } else {
        // If clicking a past/future day, default to a standard time (9:00 AM)
        initialStart = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            9, 
            0,
            0,
            0
        );
    }
    
    // Ensure the start time is on the correct clicked date (important if rounding pushed the hour to the next day)
    initialStart.setDate(date.getDate());
    initialStart.setMonth(date.getMonth());
    initialStart.setFullYear(date.getFullYear());
    
    const accurateEnd = new Date(initialStart.getTime() + 60 * 60 * 1000); // 1 hour duration

    onCreateEvent(initialStart, accurateEnd);
  };

  return (
    <div
      className="animate-fadeIn outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="grid"
      aria-label="Monthly calendar"
    >
      {/* Header Days */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2 uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-neutral-200 dark:bg-neutral-700 rounded-xl overflow-hidden">
        {grid.map((date) => {
          const dayEvents = eventsOnDay(events, date);
          const isFocused = isSameDay(date, focusedDate);
          const isRange = isInRange(date);

          return (
            <div
              key={date.toISOString()}
              onClick={(e) => handleDayClick(date, e)}
              onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
              className={`relative transition-all cursor-pointer ${
                isFocused ? "ring-2 ring-blue-500" : ""
              } ${isRange ? "bg-blue-200/30 dark:bg-blue-900/30" : ""}`}
            >
              <CalendarCell
                date={date}
                currentMonth={currentDate.getMonth()}
                today={today}
                selectedDate={selectedDate}
                events={dayEvents}
                onSelectDate={onSelectDate}
                onEventClick={onEditEvent}
                onCreateEvent={() => {}}
              />

              {/* Hover Tooltip */}
              {dayEvents.map((event) => (
                <div
                  key={event.id + "-tooltip"}
                  onMouseEnter={(e) =>
                    setTooltip({
                      visible: true,
                      text: `${event.title} | ${event.startDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} - ${event.endDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}${event.description ? ` • ${event.description}` : ""}`,
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                />
              ))}
            </div>
          );
        })}
      </div>

      <Tooltip {...tooltip} />
    </div>
  );
};

export default React.memo(MonthView);