# 📅 Elegant Calendar View Component

> “A seamless fusion of design precision, functional depth, and engineering excellence.”

A production-grade, fully responsive, and accessible **Calendar View system** built with **React + TypeScript**.  
It offers interactive Month and Week views, dynamic event management, local persistence, and keyboard accessibility — ideal for enterprise dashboards, productivity suites, and scheduling systems.

---

## 🌐 Live Interactive Demo

🎯 **Launch Storybook Experience →**  
Explore real-time interactions, animations, and theme transitions — directly in your browser.

---

## ⚙️ Quick Start

### 🧩 Installation & Setup

```bash
# Clone Repository
git clone https://github.com/aadityaguptaaa/calendar-view.git
cd calendar-view

# Install dependencies
npm install

# Run Storybook locally
npm run storybook
```

🔗 Storybook runs on: **http://localhost:6006**

---

## 🧠 Architecture Overview

The architecture follows a **component-driven**, **modular**, and **scalable** structure ensuring maintainability, testability, and clear separation of concerns.

```
src/
 ├── components/
 │    ├── Calendar/
 │    │     ├── CalendarView.tsx         # Core container with Month/Week logic
 │    │     ├── MonthView.tsx            # Grid layout for monthly view
 │    │     ├── WeekView.tsx             # Time-based 7-day schedule
 │    │     ├── EventModal.tsx           # Create/Edit/Delete modal with animations
 │    │     ├── CalendarCell.tsx         # Dynamic date cell rendering
 │    │     └── Tooltip.tsx              # Context-aware hover previews
 │    ├── primitives/
 │    │     ├── Button.tsx               # Shared button component
 │    │     ├── Modal.tsx                # Reusable modal wrapper
 │    │     └── Select.tsx               # Custom dropdown component
 │
 │── hooks/
 │    ├── useCalendar.ts                 # Date navigation & view logic
 │    ├── useEventManager.ts             # Event persistence & CRUD operations
 │    └── useTheme.ts                    # Dark/Light theme handler
 │
 │── utils/
 │    ├── date.utils.ts                  # Calendar grid & date helpers
 │    ├── event.utils.ts                 # Event sorting & validation
 │    └── sampleData.ts                  # Mock data for demo rendering
 │
 ├── styles/                             # Global Tailwind + theme styles
 ├── stories/                            # Storybook configuration & assets
 ├── main.tsx                            # App entry point
 ├── pages/App.tsx                       # Wrapper for layout testing
```

---

## ✨ Core Features

| Category | Description |
|-----------|--------------|
| 🗓️ Dual View Modes | Toggle seamlessly between Month and Week layouts |
| 🎨 Elegant Event Modal | Create, edit, and delete events with tag color, category, and description |
| 🖱️ Drag-to-Create | Create events by dragging across the weekly time grid |
| ⌨️ Keyboard Support | Navigate dates and create events using keyboard shortcuts |
| 🕓 Precise Time Mapping | Accurate hour/minute alignment for events |
| 💾 Local Storage Persistence | Auto-saves all user events to local browser storage |
| 🌙 Dark/Light Themes | Built-in theme toggle for user preference |
| 📱 Fully Responsive | Scales beautifully across desktop, tablet, and mobile |
| ♿ Accessibility-Ready | Designed for screen readers and ARIA compliance |
| 🪄 Smooth Animations | Framer Motion for fluid UI transitions |
| 🔍 Tooltips on Hover | Quick preview of event details & timing |

---

## 🧪 Storybook Stories Overview

| Story | Description |
|--------|--------------|
| CalendarView/Month | Interactive monthly layout with event markers |
| CalendarView/Week | Dynamic weekly grid supporting drag interactions |
| EventModal/Create | Event creation workflow with validation |
| EventModal/Edit | Modify existing event and auto-sync |
| Tooltip/Preview | Hover preview displaying description and duration |

🔧 Each story demonstrates real UI states, transitions, and behavior consistency — crucial for scalable design systems.

---

## 🧰 Technology Stack

| Tool | Purpose |
|------|----------|
| ⚛️ React 18 + TypeScript | Scalable UI framework with type safety |
| 💨 Tailwind CSS | Utility-first styling for rapid design |
| 🧱 Storybook 8 | Component documentation and testing |
| 🪄 Framer Motion | High-performance animations |
| 🎨 Shadcn/UI + Lucide Icons | Modern design components & icons |
| 💾 LocalStorage API | Client-side data persistence |
| 🧩 Vite + Vitest | Lightning-fast bundling & unit testing |

---

## 💡 Design Philosophy

This component system was engineered around three key principles:

- **Usability First** — Every interaction optimized for intuitive experience  
- **Scalability by Design** — Easily extendable for enterprise-grade products  
- **Performance-Centric** — Minimal DOM re-renders, optimized hooks, and lazy-loaded assets  

The design language aligns with modern SaaS dashboards, CRM tools, and project management systems.

---

## 🧑‍💻 Development Insights

- Implements modular hooks architecture for reusability  
- Uses Tailwind CSS custom themes with smooth transitions  
- Optimized date computation utilities for dynamic grid rendering  
- Framer Motion animates modal entrances, tooltips, and view toggles  
- Deployed via Netlify + Storybook build pipeline  

---

## 📈 Performance & Accessibility

| Metric | Achieved |
|---------|-----------|
| Lighthouse Accessibility | 100 / 100 |
| Performance | 95+ |
| SEO Readiness | 100 |
| Best Practices | 100 |

All elements adhere to WCAG 2.1 guidelines for accessibility and ARIA role consistency.

---

## 📜 License

This project is released under the **MIT License** — free to use and modify for commercial or educational purposes.

---

## 📧 Contact & Portfolio

👤 **Aaditya Gupta**  
📮 aaditya.workconnect@gmail.com  

🌐 **Portfolio Website**  
💼 **GitHub:** [@aadityaguptaaa](https://github.com/aadityaguptaaa)  
🔗 **LinkedIn:** [Aaditya Gupta](https://linkedin.com/in/aaditya-gupta)

---

✨ *“Design for usability. Build for scalability. Deliver with precision.”*  
— **Aaditya Gupta**
