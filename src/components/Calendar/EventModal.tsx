import React, { useState, useEffect } from "react";
import { CalendarEvent } from "./CalendarView.types";

interface ModalProps {
  isOpen: boolean;
  date: Date;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
}

const CalendarEventModal: React.FC<ModalProps> = ({ isOpen, date, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("#3b82f6");

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDesc("");
      setColor("#3b82f6");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return alert("Please enter a title.");
    onSave({
      id: `evt-${Date.now()}`,
      title,
      description: desc,
      startDate: date,
      endDate: date,
      color,
      category: "General",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 transition-transform animate-fadeIn">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Add Event</h2>

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-medium text-gray-700">Event Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-8 border rounded-md cursor-pointer"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarEventModal;
