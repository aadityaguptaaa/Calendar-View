import React from "react";
import { CalendarEvent } from "./CalendarView.types";

interface WeekViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  events,
  selectedDate,
  onSelectDate,
}) => {
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const today = new Date();
  const isToday = (d: Date) =>
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-tr from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-inner transition-all duration-500">
      <div className="grid grid-cols-7 gap-3 text-center font-semibold text-sm text-gray-600 dark:text-gray-300 mb-3">
        {weekDays.map((date, i) => (
          <div
            key={i}
            onClick={() => onSelectDate(date)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-300 ${
              isToday(date)
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-105"
                : "hover:bg-gradient-to-br hover:from-purple-100 hover:to-indigo-100 dark:hover:from-gray-800 dark:hover:to-gray-700"
            }`}
          >
            <div className="text-xs uppercase mb-1">
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className="text-lg font-bold">{date.getDate()}</div>

            {/* Events */}
            <div className="mt-2 flex flex-col gap-1 items-center">
              {events
                .filter(
                  (e) =>
                    e.startDate.toDateString() === date.toDateString()
                )
                .map((e) => (
                  <div
                    key={e.id}
                    className={`text-[10px] px-2 py-[2px] rounded-md text-white font-medium bg-gradient-to-r ${e.color}`}
                  >
                    {e.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
