import type { Meta, StoryObj } from "@storybook/react";
import CalendarView, { CalendarEvent } from "./CalendarView";
import { sampleEvents } from "../../utils/sampleData";

const meta: Meta<typeof CalendarView> = {
  title: "Components/CalendarView",
  component: CalendarView,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: () => undefined,
    onEventUpdate: () => undefined,
    onEventDelete: () => undefined
  }
};

export const Empty: Story = {
  args: {
    events: [],
    onEventAdd: () => undefined,
    onEventUpdate: () => undefined,
    onEventDelete: () => undefined
  }
};

export const WeekViewStory: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: () => undefined,
    onEventUpdate: () => undefined,
    onEventDelete: () => undefined
  },
  play: async ({ canvasElement }) => {
    // optional interactive playwright/Vitest tests can be added later
  }
};

export const LargeDataset: Story = {
  args: {
    events: Array.from({ length: 25 }).map((_, i) => ({
      id: `evt-${i}`,
      title: `Event ${i + 1}`,
      date: new Date(new Date().setDate(new Date().getDate() + (i % 10)))
    })) as CalendarEvent[]
  }
};

export const Interactive: Story = {
  args: {
    events: sampleEvents
  }
};
