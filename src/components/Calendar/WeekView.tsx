import React, { useState, useRef, useEffect } from "react";
import { CalendarEvent } from "./CalendarView.types";
import {
  startOfWeek,
  addDays,
  setHours,
  setMinutes,
} from "../../utils/date.utils";
import { eventsForDay, sortEventsByTime } from "../../utils/event.utils";

interface WeekViewProps {
  currentDate: Date;
  selectedDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: (start: Date, end: Date) => void;
  onEventMove: (id: string, newStart: Date, newEnd: Date) => void;
  isModalOpen?: boolean;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const HOUR_HEIGHT = 64; // px height for each hour row

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onEventClick,
  onCreateEvent,
  onEventMove,
  isModalOpen = false,
}) => {
  const weekStart = startOfWeek(currentDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const containerRef = useRef<HTMLDivElement>(null);

  // For dragging existing events
  const [draggingEvent, setDraggingEvent] = useState<CalendarEvent | null>(null);
  const [ghostPreview, setGhostPreview] = useState<{ day: Date; top: number } | null>(null);

  // For creating new events via drag
  const [selectDay, setSelectDay] = useState<Date | null>(null);
  const [selectStartY, setSelectStartY] = useState<number | null>(null);
  const [selectEndY, setSelectEndY] = useState<number | null>(null);

  /** Start dragging an existing event */
  const handleDragStart = (evt: CalendarEvent) => {
    setDraggingEvent(evt);
  };

  /** Drag over (for event move preview) */
  const handleDragOver = (e: React.DragEvent, day: Date) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const y = e.clientY - rect.top;
    setGhostPreview({ day, top: y });
  };

  /** Drop (move existing event) */
  const handleDrop = (e: React.DragEvent, day: Date) => {
    e.preventDefault();
    if (draggingEvent && ghostPreview) {
      const hour = Math.floor(ghostPreview.top / HOUR_HEIGHT);
      const minute = Math.floor(((ghostPreview.top % HOUR_HEIGHT) / HOUR_HEIGHT) * 60);
      const newStart = setHours(setMinutes(day, minute), hour);
      const duration = draggingEvent.endDate.getTime() - draggingEvent.startDate.getTime();
      const newEnd = new Date(newStart.getTime() + duration);
      onEventMove(draggingEvent.id, newStart, newEnd);
    }
    setDraggingEvent(null);
    setGhostPreview(null);
  };

  /** Start new selection (mousedown on empty area) */
  const handleMouseDown = (day: Date, e: React.MouseEvent) => {
    if (isModalOpen) return;
    const target = e.target as HTMLElement;
    if (target.closest(".calendar-event")) return; // ignore dragging on event

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setSelectDay(day);
    setSelectStartY(e.clientY - rect.top);
    setSelectEndY(e.clientY - rect.top);
  };

  /** Update selection (drag) */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectStartY !== null) {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const y = e.clientY - rect.top;
      setSelectEndY(y);
    }
  };

  /** End selection (mouseup → create event) */
  const handleMouseUp = () => {
    if (selectDay && selectStartY !== null && selectEndY !== null) {
      const startY = Math.min(selectStartY, selectEndY);
      const endY = Math.max(selectStartY, selectEndY);
      const startHour = Math.floor(startY / HOUR_HEIGHT);
      const startMinute = Math.floor(((startY % HOUR_HEIGHT) / HOUR_HEIGHT) * 60);
      const endHour = Math.floor(endY / HOUR_HEIGHT);
      const endMinute = Math.floor(((endY % HOUR_HEIGHT) / HOUR_HEIGHT) * 60);

      const start = setHours(setMinutes(selectDay, startMinute), startHour);
      const end = setHours(setMinutes(selectDay, endMinute), endHour);

      if (end.getTime() - start.getTime() >= 15 * 60 * 1000) {
        // Minimum 15 min selection
        onCreateEvent(start, end);
      }
    }
    setSelectDay(null);
    setSelectStartY(null);
    setSelectEndY(null);
  };

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.addEventListener("mouseup", handleMouseUp);
    return () => c.removeEventListener("mouseup", handleMouseUp);
  });

  return (
    <div ref={containerRef} className="relative overflow-x-auto animate-fadeIn select-none">
      {/* Header */}
      <div className="grid grid-cols-8 border-b border-neutral-200 dark:border-neutral-700 text-sm font-semibold bg-neutral-50 dark:bg-neutral-900 sticky top-0 z-20">
        <div className="p-2 text-center text-neutral-500">Time</div>
        {days.map((day) => (
          <div key={day.toISOString()} className="p-2 text-center">
            <div className="font-medium">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className="text-xs opacity-75">{day.getDate()}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-8 relative">
        {/* Time column */}
        <div className="flex flex-col border-r border-neutral-200 dark:border-neutral-700">
          {HOURS.map((h) => (
            <div
              key={h}
              className="h-16 border-b border-neutral-100 dark:border-neutral-800 text-xs text-center text-neutral-500"
            >
              {h.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {days.map((day) => {
          const dayEvents = sortEventsByTime(eventsForDay(events, day));
          const isSelectedDay = selectDay && selectDay.toDateString() === day.toDateString();

          return (
            <div
              key={day.toISOString()}
              className="relative border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors"
              onMouseDown={(e) => handleMouseDown(day, e)}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onDragOver={(e) => handleDragOver(e, day)}
              onDrop={(e) => handleDrop(e, day)}
            >
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="h-16 border-b border-neutral-100 dark:border-neutral-800 relative"
                />
              ))}

              {/* Render Events */}
              {dayEvents.map((evt) => {
                const startHour = evt.startDate.getHours() + evt.startDate.getMinutes() / 60;
                const endHour = evt.endDate.getHours() + evt.endDate.getMinutes() / 60;
                const top = startHour * HOUR_HEIGHT;
                const height = Math.max((endHour - startHour) * HOUR_HEIGHT, 20);

                return (
                  <div
                    key={evt.id}
                    className="calendar-event absolute left-1 right-1 rounded-md shadow-md text-xs text-white p-1 cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform"
                    style={{
                      top,
                      height,
                      background: evt.color || "linear-gradient(to right,#60a5fa,#3b82f6)",
                    }}
                    draggable
                    onDragStart={() => handleDragStart(evt)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(evt);
                    }}
                  >
                    <div className="font-semibold text-center truncate">
                      {evt.title}
                    </div>
                  </div>
                );
              })}

              {/* Selection Ghost (for new event creation) */}
              {isSelectedDay && selectStartY !== null && selectEndY !== null && (
                <div
                  className="absolute left-1 right-1 bg-blue-400/40 border-2 border-blue-500 border-dashed rounded-md pointer-events-none"
                  style={{
                    top: Math.min(selectStartY, selectEndY),
                    height: Math.abs(selectEndY - selectStartY),
                  }}
                />
              )}

              {/* Ghost preview (while moving existing event) */}
              {ghostPreview &&
                ghostPreview.day.toDateString() === day.toDateString() && (
                  <div
                    className="absolute left-1 right-1 border-2 border-dashed border-blue-500 bg-blue-400/30 rounded-md pointer-events-none"
                    style={{
                      top: ghostPreview.top - 10,
                      height: 60,
                    }}
                  />
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
