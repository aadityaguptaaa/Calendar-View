import "../src/styles/globals.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#111827" },
      ],
    },
  },
};

export default preview;
