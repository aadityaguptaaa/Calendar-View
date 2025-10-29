import React, { useState } from "react";

interface EventModalProps {
  onClose: () => void;
  onAdd: (title: string, color: string) => void;
}

const COLORS = [
  { name: "Blue", value: "from-blue-500 to-indigo-500" },
  { name: "Green", value: "from-green-400 to-emerald-500" },
  { name: "Purple", value: "from-purple-500 to-pink-500" },
  { name: "Orange", value: "from-orange-400 to-amber-500" },
];

const EventModal: React.FC<EventModalProps> = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(COLORS[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, color);
      setTitle("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="relative w-[90%] sm:w-[420px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden transition-all duration-500 animate-scaleIn">
        {/* Gradient Border Glow */}
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-sm opacity-70" />

        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white font-semibold flex justify-between items-center">
          <span>✨ Add New Event</span>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl transition"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative p-6 space-y-5 z-10">
          {/* Title Input */}
          <div>
            <label
              htmlFor="event-title"
              className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
            >
              Event Title
            </label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your event name..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition"
            />
          </div>

          {/* Color Selector */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Event Theme Color
            </label>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`h-8 w-8 rounded-full bg-gradient-to-r ${c.value} border-2 ${
                    color === c.value
                      ? "border-blue-400 scale-110"
                      : "border-transparent opacity-70 hover:opacity-100"
                  } transition-all`}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              + Add
            </button>
          </div>
        </form>

        {/* Animated Footer Glow */}
        <div className="relative h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradientMove" />
      </div>
    </div>
  );
};

export default EventModal;
