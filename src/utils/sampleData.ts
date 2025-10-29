import type { CalendarEvent } from "../components/Calendar/CalendarView";

export const sampleEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Team Standup",
    date: new Date()
  },
  {
    id: "evt-2",
    title: "Design Review",
    date: new Date(new Date().setDate(new Date().getDate() + 1))
  },
  {
    id: "evt-3",
    title: "Client Presentation",
    date: new Date(new Date().setDate(new Date().getDate() + 2))
  }
];
