import "../src/styles/globals.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  backgrounds: {
    default: "light",
    values: [
      { name: "light", value: "#ffffff" },
      { name: "dark", value: "#0f172a" },
      { name: "gradient", value: "linear-gradient(135deg,#3b82f6,#9333ea)" },
    ],
  },
};
