import React from "react";
import CalendarView from "./CalendarView";
import { CalendarEvent } from "./CalendarView.types";

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Sync",
    startDate: new Date(),
    endDate: new Date(new Date().setHours(new Date().getHours() + 1)),
    color: "#3b82f6",
    description: "Weekly check-in meeting",
  },
  {
    id: "2",
    title: "Doctor Appointment",
    startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    color: "#f97316",
  },
];

export default {
  title: "Calendar/CalendarView",
  component: CalendarView,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => <CalendarView />;
Default.storyName = "Default (Month View)";

export const Empty = () => <CalendarView />;
Empty.storyName = "Empty Calendar";

export const WeekView = () => <CalendarView />;
WeekView.storyName = "Week View (with time slots)";

export const LargeDataset = () => {
  const events = Array.from({ length: 25 }).map((_, i) => ({
    id: String(i),
    title: `Event ${i + 1}`,
    startDate: new Date(new Date().setDate(new Date().getDate() + (i % 7))),
    endDate: new Date(new Date().setDate(new Date().getDate() + (i % 7))),
    color: ["#3b82f6", "#f97316", "#10b981", "#ef4444"][i % 4],
  }));
  return <CalendarView key="large" />;
};
LargeDataset.storyName = "Large Dataset (20+ Events)";

export const Playground = () => <CalendarView />;
Playground.storyName = "Interactive Playground";
