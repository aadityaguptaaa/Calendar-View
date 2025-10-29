import React from "react";
import CalendarView from "../components/Calendar/CalendarView";

const App = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all">
      <header className="w-full text-center py-6">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          ✨ Elegant Calendar
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Your personal scheduling companion
        </p>
      </header>

      <main className="w-full max-w-5xl px-4 animate-fadeIn">
        <CalendarView />
      </main>

      <footer className="mt-8 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Elegant Calendar — Designed by Aaditya 💎</p>
      </footer>
    </div>
  );
};

export default App;
