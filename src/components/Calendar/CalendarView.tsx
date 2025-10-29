import React, { useEffect, useState } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import EventModal from "./EventModal";
import { useEventManager } from "../../hooks/useEventManager";
import type { CalendarEvent } from "../../components/Calendar/CalendarView.types";



const CalendarView: React.FC = () => {
  const { events, addEvent } = useEventManager([]);
  const [view, setView] = useState<"month" | "week">("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  // Sync theme with <html> and localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleAdd = (title: string) => {
    const newEvent: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title,
      startDate: selectedDate,
      endDate: selectedDate,
      color: "from-blue-400 to-indigo-500",
    };
    addEvent(newEvent);
    setShowModal(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-10 
                 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                 transition-all duration-500"
    >
      {/* Header */}
      <header
        className="w-full max-w-5xl flex justify-between items-center 
                   mb-8 px-6 py-4 rounded-3xl shadow-lg
                   bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
                   text-white animate-gradientMove"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">📅</span>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Elegant Calendar
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-4 py-2 text-sm font-semibold rounded-xl shadow-md 
                       bg-white/20 hover:bg-white/30 backdrop-blur-md transition"
          >
            {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      {/* Calendar Container */}
      <main
        className="w-full max-w-5xl p-8 rounded-3xl shadow-2xl 
                   bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg 
                   border border-white/30 dark:border-gray-700 
                   animate-fadeIn transition-all duration-500"
      >
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setView("month")}
              className={`px-5 py-2 rounded-xl font-semibold transition 
                ${
                  view === "month"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-5 py-2 rounded-xl font-semibold transition 
                ${
                  view === "week"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              Week
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 rounded-xl font-semibold 
                       bg-gradient-to-r from-green-400 to-emerald-600 
                       text-white shadow-lg hover:scale-105 transform transition"
          >
            + Add Event
          </button>
        </div>

        {/* Calendar */}
        <div className="transition-all duration-700 ease-in-out">
          {view === "month" ? (
            <MonthView
              events={events}
              onSelectDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          ) : (
            <WeekView
              events={events}
              onSelectDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <EventModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-10 text-gray-600 dark:text-gray-400 text-sm">
        
      </footer>
    </div>
  );
};

export default CalendarView;
export { CalendarEvent };
