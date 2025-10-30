# 📅 Elegant Calendar View Component

A fully responsive, accessible, and visually refined **Calendar View System** built with **React + TypeScript**, featuring **Month and Week views**, event management, and keyboard interaction.  
Designed for seamless integration into enterprise dashboards and productivity platforms.

---

## 🚀 Live Storybook

🎯 **[View Interactive Demo](https://calendar-view-storybook.vercel.app)**  
*(Replace with your deployed Storybook link)*

---

## ⚙️ Installation & Setup

```bash
# Clone Repository
git clone https://github.com/yourusername/calendar-view.git
cd calendar-view

# Install dependencies
npm install

# Run Storybook locally
npm run storybook
```

Storybook will start on [http://localhost:6006](http://localhost:6006)

---

## 🧠 Architecture Overview

The project follows a **modular and scalable component-driven architecture**, where each view (Month, Week, EventModal, etc.) is isolated for maintainability and reusability.

```
src/
 ├── components/
 │    ├── Calendar/
 │    │     ├── CalendarView.tsx     # Main container with logic for Month/Week views
 │    │     ├── MonthView.tsx        # 30/31-day grid layout with keyboard & tooltip
 │    │     ├── WeekView.tsx         # 7-day grid with draggable time blocks
 │    │     ├── EventModal.tsx       # Create/Edit/Delete event dialog
 │    │     ├── CalendarCell.tsx     # Individual date cell renderer
 │    │     └── Tooltip.tsx          # Smart hover tooltips
 │    ├── hooks/
 │    │     ├── useEventManager.ts   # Local storage event persistence
 │    │     └── useCalendar.ts       # Calendar navigation logic
 │    └── utils/
 │          ├── date.utils.ts        # Calendar grid & date helpers
 │          └── event.utils.ts       # Event filtering and sorting
```

---

## ✨ Features

- 🗓️ **Dual View Modes** — Seamless toggle between **Month** and **Week**
- 🎨 **Modern Event Modal** — Create, edit, and delete events with color & category tags  
- 🧭 **Keyboard Navigation** — Navigate dates using arrow keys, press **Enter** to create  
- 🖱️ **Drag-to-Create Events** — Directly create events on the weekly time grid  
- 🕓 **Accurate Time Mapping** — Events mapped to exact hour & minute slots  
- 🧩 **Persistent Storage** — Events auto-save locally using browser storage  
- 📱 **Fully Responsive** — Adapts beautifully across all screen sizes  
- 🌙 **Dark/Light Theme** — Elegant theme toggle built-in  
- 🔍 **Tooltips on Hover** — Quick event preview with description and time  
- ♿ **Accessibility Ready** — Designed with ARIA-friendly keyboard support  

---

## 🧪 Storybook Stories

| Story | Description |
|--------|--------------|
| `CalendarView/Month` | Full monthly layout with event previews |
| `CalendarView/Week` | Interactive 7-day schedule with drag events |
| `EventModal/Create` | New event form with category and color selection |
| `EventModal/Edit` | Edit existing event and persist updates |
| `Tooltip/Preview` | Hover view for quick time + description insight |

---

## 🧰 Technologies Used

- ⚛️ **React 18 + TypeScript**
- 💨 **Tailwind CSS**
- 🧱 **Storybook 8**
- 🪄 **Framer Motion** (for animations)
- 🎨 **Lucide Icons + Shadcn/UI**
- 🧩 **LocalStorage API** (for persistence)

---

## 🧑‍💻 Developer Notes

This component was built with scalability, accessibility, and performance in mind — suitable for dashboards, scheduling systems, productivity suites, and CRM platforms.

The modular structure ensures easy integration into any existing **React** ecosystem.

---

## 📧 Contact

👤 **Aaditya Gupta**  
📮 Email: [aaditya.workconnect@gmail.com](mailto:aaditya.workconnect@gmail.com)  
🌐 Portfolio: [https://aadityagupta.dev](https://aadityagupta.dev)

---

> 💡 *“Design for usability. Build for scalability. Deliver with precision.”*  
> — *Aaditya Gupta*
