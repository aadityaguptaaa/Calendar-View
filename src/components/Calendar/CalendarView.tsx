// src/components/Calendar/CalendarView.tsx
import React, { useState, useEffect, useCallback } from "react";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import EventModal from "./EventModal";
import { CalendarEvent } from "./CalendarView.types";
import { useEventManager } from "../../hooks/useEventManager";
import { useCalendar } from "../../hooks/useCalendar";

// ───────────────────────────────────────────────
// 🎨 Elegant Calendar Main Component
// ───────────────────────────────────────────────
const CalendarView: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, moveEvent } =
    useEventManager([]);
  const {
    currentDate,
    view,
    setView,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
  } = useCalendar(new Date());

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const [toast, setToast] = useState<string | null>(null);

  // 🌗 Theme persistence
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ─────────────── Event Handlers ───────────────
  const handleAddEvent = useCallback(
    (event: CalendarEvent) => {
      addEvent(event);
      setToast("✅ Event saved successfully");
      setTimeout(() => setToast(null), 2000);
    },
    [addEvent]
  );

  const handleUpdateEvent = useCallback(
    (id: string, updates: Partial<CalendarEvent>) => {
      updateEvent(id, updates);
      setToast("✏️ Event updated");
      setTimeout(() => setToast(null), 2000);
    },
    [updateEvent]
  );

  const handleDeleteEvent = useCallback(
    (id: string) => {
      deleteEvent(id);
      setToast("🗑️ Event deleted");
      setTimeout(() => setToast(null), 2000);
    },
    [deleteEvent]
  );

  const handleMoveEvent = useCallback(
    (id: string, newStart: Date, newEnd: Date) => {
      moveEvent(id, newStart, newEnd);
      setToast("📦 Event moved");
      setTimeout(() => setToast(null), 2000);
    },
    [moveEvent]
  );

  // ─────────────── Modal Control ───────────────
  const openCreateModal = useCallback((start: Date, end: Date) => {
    setSelectedDate(start);
    setModalMode("create");
    // Temporarily set the new event's initial data here
    setEditEvent({
      id: `evt-temp-${Date.now()}`, 
      title: "New Event", 
      description: "",
      startDate: start, 
      endDate: end,     
      color: "#3b82f6", 
      category: "",
    } as CalendarEvent);
    setShowModal(true);
  }, []);

  const openEditModal = useCallback((event: CalendarEvent) => {
    setEditEvent(event);
    setModalMode("edit");
    setShowModal(true);
  }, []);

  // 🌈 Theme Background
  const gradient =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
      : "bg-gradient-to-br from-blue-50 via-white to-blue-100";

  // ─────────────── Render ───────────────
  return (
    <div
      className={`min-h-screen transition-all duration-700 ${gradient} text-neutral-900 dark:text-neutral-100 p-6 relative`}
    >
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 bg-neutral-900/90 dark:bg-white/90 text-white dark:text-neutral-900 px-4 py-2 rounded-lg shadow-md animate-fadeIn">
          {toast}
        </div>
      )}

      {/* Header Controls */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Elegant Calendar
        </h1>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                view === "month"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow"
                  : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                view === "week"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow"
                  : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              }`}
            >
              Week
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 dark:from-yellow-400 dark:to-yellow-600 text-white hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousMonth}
            className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={goToNextMonth}
            className="px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
          >
            →
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={goToToday}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-105 transition-transform"
          >
            Today
          </button>
          <button
            onClick={() => {
              const now = new Date();
              const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0);
              const end = new Date(start.getTime() + 60 * 60 * 1000);
              openCreateModal(start, end);
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow hover:scale-105 transition-transform"
          >
            + New Event
          </button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-lg backdrop-blur-xl p-4 transition-all duration-500">
        {view === "month" ? (
          <MonthView
            currentDate={currentDate}
            events={events}
            selectedDate={selectedDate || new Date()}
            onSelectDate={setSelectedDate}
            onCreateEvent={openCreateModal} 
            onEditEvent={openEditModal}
          />
        ) : (
          <WeekView
            currentDate={currentDate}
            selectedDate={selectedDate || new Date()}
            events={events}
            onSelectDate={setSelectedDate}
            onEventClick={openEditModal}
            onCreateEvent={(start, end) => {
              const event: CalendarEvent = {
                id: `evt-${Date.now()}`,
                title: "New Event",
                startDate: start,
                endDate: end,
                color: "linear-gradient(to right,#60a5fa,#3b82f6)",
              };
              handleAddEvent(event);
            }}
            onEventMove={handleMoveEvent}
            isModalOpen={showModal}
          />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <EventModal
          isOpen={showModal}
          mode={modalMode}
          initialData={editEvent} 
          onClose={() => setShowModal(false)}
          onSave={handleAddEvent}
          onUpdate={handleUpdateEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
};

export default React.memo(CalendarView);