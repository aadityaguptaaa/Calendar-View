// src/components/Calendar/EventModal.tsx
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { CalendarEvent } from "./CalendarView.types";

interface EventModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialData?: CalendarEvent | null;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
  onDelete?: (id: string) => void;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"];
const CATEGORIES = ["Work", "Personal", "Meeting", "Study", "Travel", "Other"];

// Helper function to format Date object into "YYYY-MM-DD" for date input
const formatDate = (date: Date) => date.toISOString().slice(0, 10);
// Helper function to format Date object into "HH:MM" for time input
const formatTime = (date: Date) => date.toISOString().slice(11, 16);

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSave,
  onUpdate,
  onDelete,
}) => {
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState<CalendarEvent>(() => ({
    id: initialData?.id || `evt-${Date.now()}`,
    title: initialData?.title || "",
    description: initialData?.description || "",
    startDate: initialData?.startDate || new Date(),
    endDate: initialData?.endDate || new Date(),
    color: initialData?.color || COLORS[0],
    category: initialData?.category || "",
  }));

  // State to manage date and time strings for controlled inputs
  const [startDateTime, setStartDateTime] = useState({
    date: formatDate(form.startDate),
    time: formatTime(form.startDate),
  });
  const [endDateTime, setEndDateTime] = useState({
    date: formatDate(form.endDate),
    time: formatTime(form.endDate),
  });

  // Smooth show animation with slight delay
  useLayoutEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      timer = setTimeout(() => setVisible(true), 120);
      document.body.style.overflow = "hidden";
    }
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Effect to update form state and string states when initialData changes
  useEffect(() => {
    if (initialData) {
      const start = new Date(initialData.startDate);
      const end = new Date(initialData.endDate);
      setForm({
        ...initialData,
        startDate: start,
        endDate: end,
      });
      setStartDateTime({ date: formatDate(start), time: formatTime(start) });
      setEndDateTime({ date: formatDate(end), time: formatTime(end) });
    }
  }, [initialData]);

  // Handler to sync date/time string changes back to the main Date object in form state
  const handleDateTimeChange = (
    isStart: boolean,
    type: 'date' | 'time',
    value: string
  ) => {
    const target = isStart ? startDateTime : endDateTime;
    const setter = isStart ? setStartDateTime : setEndDateTime;
    const newTarget = { ...target, [type]: value };
    setter(newTarget);

    // Combine date and time strings into a new Date object
    const [year, month, day] = newTarget.date.split('-').map(Number);
    const [hour, minute] = newTarget.time.split(':').map(Number);

    // Create a new Date object using local values
    const newDate = new Date(year, month - 1, day, hour, minute);

    setForm((prevForm) => ({
      ...prevForm,
      [isStart ? 'startDate' : 'endDate']: newDate,
    }));
  };

  const validate = (): boolean => {
    const e: { [key: string]: string } = {};
    if (!form.title.trim()) e.title = "Title required";
    if (form.endDate.getTime() <= form.startDate.getTime()) e.endDate = "End must be after start";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === "edit") {
      onUpdate(form.id, form);
    } else {
      onSave({ ...form, id: `evt-${Date.now()}` });
    }
    handleClose();
  };

  if (!isOpen) return null;

  // Base class for date/time inputs for clean vertical alignment
  const inputBaseClasses = "p-2 rounded border dark:border-neutral-700 dark:bg-neutral-800 h-10 appearance-none";

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center 
        transition-all duration-250 ${visible ? "opacity-100" : "opacity-0"} 
        bg-black/40 backdrop-blur-sm`}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className={`relative w-[95%] max-w-lg transform transition-all duration-300 
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-2">
          {mode === "create" ? "Create New Event" : "Edit Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 rounded border dark:border-neutral-700 dark:bg-neutral-800"
              required
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-2 h-20 rounded border dark:border-neutral-700 dark:bg-neutral-800"
            />
          </div>

          {/* Time Pickers (FIXED: Date and Time input widths are now fixed for tight control) */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm mb-1">Start</label>
              <div className="flex gap-2">
                {/* Start Date Input */}
                <input
                  type="date"
                  value={startDateTime.date}
                  onChange={(e) => handleDateTimeChange(true, 'date', e.target.value)}
                  // 💡 FIX: Fixed width (w-28) for the date input
                  className={`w-28 ${inputBaseClasses} flex items-center`} 
                />
                {/* Start Time Input */}
                <input
                  type="time"
                  value={startDateTime.time}
                  onChange={(e) => handleDateTimeChange(true, 'time', e.target.value)}
                  // Fixed width (w-20) for the time input
                  className={`w-20 ${inputBaseClasses} flex items-center`}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-1">End</label>
              <div className="flex gap-2">
                {/* End Date Input */}
                <input
                  type="date"
                  value={endDateTime.date}
                  onChange={(e) => handleDateTimeChange(false, 'date', e.target.value)}
                  // 💡 FIX: Fixed width (w-28) for the date input
                  className={`w-28 ${inputBaseClasses} flex items-center`}
                />
                {/* End Time Input */}
                <input
                  type="time"
                  value={endDateTime.time}
                  onChange={(e) => handleDateTimeChange(false, 'time', e.target.value)}
                  // Fixed width (w-20) for the time input
                  className={`w-20 ${inputBaseClasses} flex items-center`}
                />
              </div>
              {errors.endDate && (
                <p className="text-xs text-red-500">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm mb-1">Color</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`w-6 h-6 rounded-full border-2 ${
                    form.color === c
                      ? "border-blue-500 scale-110"
                      : "border-transparent"
                  } transition-transform`}
                  style={{ backgroundColor: c }}
                  onClick={() => setForm({ ...form, color: c })}
                />
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 rounded border dark:border-neutral-700 dark:bg-neutral-800"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            {mode === "edit" && onDelete && (
              <button
                type="button"
                onClick={() => {
                  onDelete(form.id);
                  handleClose();
                }}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Delete Event
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border rounded-lg text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:scale-[1.02] transition-transform"
              >
                {mode === "create" ? "Save Event" : "Update Event"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;