// src/components/Calendar/CalendarCell.tsx
import React from "react";
import { CalendarEvent } from "./CalendarView.types";
import { isSameDay } from "../../utils/date.utils";

/**
 * 📅 CalendarCell
 * Represents a single day cell in MonthView.
 * Handles event display, selection, and creation.
 */
interface CalendarCellProps {
  date: Date;
  currentMonth: number;
  today: Date;
  selectedDate: Date | null;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: (date: Date) => void;
}

const CalendarCell: React.FC<CalendarCellProps> = React.memo(
  ({
    date,
    currentMonth,
    today,
    selectedDate,
    events,
    onSelectDate,
    onEventClick,
    onCreateEvent,
  }) => {
    const isCurrentMonth = date.getMonth() === currentMonth;
    const isToday = isSameDay(date, today);
    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

    const handleCellClick = () => {
      onSelectDate(date);
      onCreateEvent(date);
    };

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`${date.toDateString()} - ${events.length} events`}
        aria-pressed={isSelected}
        onClick={handleCellClick}
        onKeyDown={(e) => e.key === "Enter" && handleCellClick()}
        className={`relative border border-neutral-200 dark:border-neutral-700 p-2 h-32 cursor-pointer transition-colors select-none
          ${
            isCurrentMonth
              ? "bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              : "bg-neutral-100 dark:bg-neutral-800/60 text-neutral-400"
          }
          ${isSelected ? "ring-2 ring-primary-500 ring-offset-2" : ""}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
          animate-fadeIn
        `}
      >
        {/* ──────────────── Date Badge ──────────────── */}
        <div className="flex justify-between items-start mb-1">
          {isToday ? (
            <span className="w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white text-xs flex items-center justify-center rounded-full shadow-sm">
              {date.getDate()}
            </span>
          ) : (
            <span className="text-sm font-medium">{date.getDate()}</span>
          )}
        </div>

        {/* ──────────────── Events ──────────────── */}
        <div className="space-y-1 overflow-hidden">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event);
              }}
              className="text-xs px-2 py-0.5 rounded truncate text-white cursor-pointer hover:opacity-90 transition-opacity"
              style={{
                background: event.color || "linear-gradient(to right, #3b82f6, #6366f1)",
              }}
            >
              {event.title}
            </div>
          ))}

          {events.length > 3 && (
            <div className="text-xs text-primary-600 dark:text-primary-400 truncate hover:underline cursor-pointer">
              +{events.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  }
);

CalendarCell.displayName = "CalendarCell";

export default CalendarCell;
