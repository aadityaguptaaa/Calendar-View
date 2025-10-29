import React, { useCallback } from "react";
import { isSameDay } from "date-fns";
import type { CalendarEvent } from "./CalendarView";
import clsx from "clsx";

interface CellProps {
  date: Date;
  isOutside: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
  onSelect: (d: Date) => void;
}

export const CalendarCell: React.FC<CellProps> = React.memo(({ date, isOutside, isToday, isSelected, events, onSelect }) => {
  const onClick = useCallback(() => onSelect(date), [date, onSelect]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      aria-label={`Select ${date.toDateString()}. ${events.length} events.`}
      className={clsx(
        "p-3 rounded-lg select-none transition cursor-pointer focus:outline-none focus:ring-2",
        isOutside ? "text-gray-500" : isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-gray-900",
        isToday && "border border-blue-400"
      )}
    >
      <div className="text-sm">{date.getDate()}</div>
      {events.slice(0, 2).map(evt => (
        <div key={evt.id} className="mt-1 text-xs truncate bg-blue-100 text-blue-800 rounded px-1">
          {evt.title}
        </div>
      ))}
      {events.length > 2 && <div className="text-xs text-blue-600 mt-1">+{events.length - 2} more</div>}
    </div>
  );
});
