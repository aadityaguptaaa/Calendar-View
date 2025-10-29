import React from "react";
import { addDays, startOfWeek, format } from "date-fns";
import type { CalendarEvent } from "./CalendarView";

interface Props {
  baseDate: Date;
  events: CalendarEvent[];
}

export const WeekView: React.FC<Props> = ({ baseDate, events }) => {
  const start = startOfWeek(baseDate);
  const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-7 gap-1">
        {days.map(d => (
          <div key={d.toISOString()} className="border rounded p-2 min-h-[12rem]">
            <div className="font-semibold">{format(d, "EEE dd")}</div>
            <div className="mt-2 space-y-1">
              {events.filter(e => e.date.toDateString() === d.toDateString()).map(evt => (
                <div key={evt.id} className="text-sm bg-blue-50 text-blue-800 rounded px-2 py-1">{evt.title}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
