import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { CalendarEvent, CalendarViewProps } from "./CalendarView.types";
import CalendarEventModal from "./EventModal";

const CalendarView: React.FC<CalendarViewProps> = ({
  events = [],
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = "month",
  initialDate = new Date(),
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState<"month" | "week">(initialView);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate =
    viewMode === "month" ? startOfWeek(monthStart) : startOfWeek(currentDate);
  const endDate =
    viewMode === "month"
      ? endOfWeek(monthEnd)
      : addDays(startDate, 6);

  const handlePrev = () =>
    setCurrentDate(
      viewMode === "month" ? subMonths(currentDate, 1) : subWeeks(currentDate, 1)
    );
  const handleNext = () =>
    setCurrentDate(
      viewMode === "month" ? addMonths(currentDate, 1) : addWeeks(currentDate, 1)
    );

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    setModalOpen(true);
  };

  const handleSaveEvent = (event: CalendarEvent) => onEventAdd(event);

  // Header with animation
  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6 animate-fadeIn">
      <div className="flex items-center gap-2">
        <button onClick={handlePrev} className="nav-btn">←</button>
        <h2 className="text-2xl font-semibold text-gray-900">
          {viewMode === "month"
            ? format(currentDate, "MMMM yyyy")
            : `Week of ${format(startDate, "dd MMM yyyy")}`}
        </h2>
        <button onClick={handleNext} className="nav-btn">→</button>
      </div>

      <div className="flex gap-2">
        {["month", "week"].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as "month" | "week")}
            className={`px-3 py-1 rounded-md font-medium ${
              viewMode === mode
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {mode === "month" ? "Month" : "Week"}
          </button>
        ))}
      </div>
    </div>
  );

  const renderDays = () => {
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 mb-2">
        {dayLabels.map((label) => (
          <div
            key={label}
            className="text-sm font-semibold text-center text-gray-700 uppercase"
          >
            {label}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const isOutsideMonth = !isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isSelected = isSameDay(day, selectedDate);

        const dayEvents = events.filter(
          (evt) => evt.startDate <= day && evt.endDate >= day
        );

        days.push(
          <div
            key={day.toString()}
            onClick={() => handleDateClick(day)}
            className={`calendar-cell ${
              isOutsideMonth && viewMode === "month"
                ? "text-gray-400"
                : isSelected
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-50"
            } ${isToday ? "border-blue-500 border" : ""}`}
          >
            <div className="font-medium">{formattedDate}</div>
            {dayEvents.map((evt) => (
              <div
                key={evt.id}
                className="mt-1 text-xs rounded-md px-1 truncate"
                style={{ backgroundColor: evt.color || "#bfdbfe" }}
              >
                {evt.title}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-1 mb-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="animate-fadeIn">{rows}</div>;
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <CalendarEventModal
        isOpen={isModalOpen}
        date={selectedDate}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default CalendarView;
