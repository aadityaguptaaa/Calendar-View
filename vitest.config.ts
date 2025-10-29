import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Clean + Tailwind + React + TypeScript ready
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // optional: allows imports like "@/components/Calendar/CalendarView"
    },
  },
  server: {
    port: 5173,
    open: true, // auto opens browser
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
