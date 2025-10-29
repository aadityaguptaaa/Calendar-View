import React, { useState } from "react";
import CalendarView from "../components/Calendar/CalendarView";
import { sampleEvents } from "../utils/sampleData";
import type { CalendarEvent } from "../components/Calendar/CalendarView";

const App: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

  const handleAdd = (evt: CalendarEvent) => setEvents(prev => [...prev, evt]);
  const handleUpdate = (id: string, updates: Partial<CalendarEvent>) =>
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
  const handleDelete = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Calendar Component</h1>
        <CalendarView
          events={events}
          onEventAdd={handleAdd}
          onEventUpdate={handleUpdate}
          onEventDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
