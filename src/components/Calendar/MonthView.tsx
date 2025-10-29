import React from "react";
import { CalendarEvent } from "./CalendarView.types";

interface MonthViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ events, selectedDate, onSelectDate }) => {
  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);

  const startDay = start.getDay();
  const totalDays = end.getDate();

  const dates = Array.from({ length: startDay + totalDays }, (_, i) =>
    i < startDay ? null : new Date(year, month, i - startDay + 1)
  );

  const isToday = (d: Date) =>
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 shadow-inner transition-all duration-500">
      <div className="grid grid-cols-7 text-center mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, idx) => (
          <div
            key={idx}
            onClick={() => date && onSelectDate(date)}
            className={`aspect-square flex flex-col justify-start items-center p-1 rounded-xl cursor-pointer relative transition-all ${
              date
                ? "hover:scale-105 hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 dark:hover:from-gray-800 dark:hover:to-gray-700"
                : "opacity-0"
            } ${isToday(date || new Date()) ? "ring-2 ring-blue-400 dark:ring-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-700" : ""}
            `}
          >
            {date && (
              <>
                <span
                  className={`text-sm font-semibold ${
                    isToday(date)
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {date.getDate()}
                </span>

                {/* Events */}
                <div className="mt-1 flex flex-col gap-1 w-full">
                  {events
                    .filter(
                      (e) =>
                        e.startDate.toDateString() === date.toDateString()
                    )
                    .map((e) => (
                      <div
                        key={e.id}
                        className={`text-[10px] text-white font-medium truncate rounded-md px-1 py-[2px] bg-gradient-to-r ${e.color}`}
                      >
                        {e.title}
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
