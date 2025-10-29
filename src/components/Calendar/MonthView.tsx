import React from "react";
import { getCalendarGrid } from "../../utils/date.utils";
import type { CalendarEvent } from "./CalendarView";
import { CalendarCell } from "./CalendarCell";

interface Props {
  baseDate: Date;
  selected?: Date | null;
  events: CalendarEvent[];
  onSelect: (d: Date) => void;
}

export const MonthView: React.FC<Props> = ({ baseDate, selected, events, onSelect }) => {
  const grid = getCalendarGrid(baseDate);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1">
        {grid.map(day => {
          const dayEvents = events.filter(e => e.date.toDateString() === day.toDateString());
          const isOutside = day.getMonth() !== baseDate.getMonth();
          const isToday = day.toDateString() === new Date().toDateString();
          const isSelected = selected ? selected.toDateString() === day.toDateString() : false;
          return (
            <CalendarCell
              key={day.toISOString()}
              date={day}
              isOutside={isOutside}
              isToday={isToday}
              isSelected={isSelected}
              events={dayEvents}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
};
