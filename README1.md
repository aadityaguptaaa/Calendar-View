```{=html}
<h1 align="center">
```
📅 Elegant Calendar View Component
```{=html}
</h1>
```
```{=html}
<p align="center">
```
`<b>`{=html}A sophisticated, accessible, and production-ready calendar
system built with React + TypeScript.`</b>`{=html}`<br/>`{=html}
`<i>`{=html}Designed for seamless integration into enterprise dashboards
and productivity platforms.`</i>`{=html}
```{=html}
</p>
```
```{=html}
<p align="center">
```
`<img src="https://img.shields.io/badge/React-18-blue?logo=react" />`{=html}
`<img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />`{=html}
`<img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css" />`{=html}
`<img src="https://img.shields.io/badge/Storybook-8-FF4785?logo=storybook" />`{=html}
`<img src="https://img.shields.io/badge/License-MIT-green" />`{=html}
```{=html}
</p>
```

------------------------------------------------------------------------

## 🚀 Live Storybook Demo

🎯 **[👉 Launch Interactive Storybook
Experience](https://calendar-viewx.netlify.app/)**

> Explore real-time interactions, animations, and view transitions
> directly in your browser.

------------------------------------------------------------------------

```{=html}
<details open>
```
```{=html}
<summary>
```
`<b>`{=html}⚙️ Quick Setup`</b>`{=html}
```{=html}
</summary>
```
``` bash
# Clone repository
git clone https://github.com/aadityaguptaaa/calendar-view.git
cd calendar-view

# Install dependencies
npm install

# Run Storybook locally
npm run storybook
```

Storybook runs at 👉 <http://localhost:6006>
```{=html}
</details>
```

------------------------------------------------------------------------

```{=html}
<details open>
```
```{=html}
<summary>
```
`<b>`{=html}🧠 Architecture Overview`</b>`{=html}
```{=html}
</summary>
```
    src/
     ├── components/
     │    ├── Calendar/
     │    │     ├── CalendarView.tsx         # Core container with Month/Week logic
     │    │     ├── MonthView.tsx            # Grid layout for monthly view
     │    │     ├── WeekView.tsx             # Time-based 7-day schedule
     │    │     ├── EventModal.tsx           # Create/Edit/Delete modal with animation
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

```{=html}
</details>
```

------------------------------------------------------------------------

## ✨ Core Highlights

  -----------------------------------------------------------------------
  Feature                       Description
  ----------------------------- -----------------------------------------
  🗓️ **Dual View Modes**        Toggle between Month & Week layouts
                                effortlessly

  🎨 **Modern Event Modal**     Add, edit, and delete events with
                                category tags & color labels

  🖱️ **Drag-to-Create**         Drag across weekly grid to create new
                                events

  ⌨️ **Keyboard Support**       Navigate calendar and create events via
                                keyboard

  💾 **Local Storage            Auto-saves events locally for continuity
  Persistence**                 

  🌙 **Dark/Light Theme**       Built-in theme switcher with smooth
                                transitions

  📱 **Responsive Layout**      Works seamlessly across all devices

  ♿ **Accessibility Ready**    Screen-reader & ARIA compliant

  🪄 **Framer Motion            Fluid transitions and hover effects
  Animations**                  

  🔍 **Smart Tooltips**         Hover preview for event details
  -----------------------------------------------------------------------

------------------------------------------------------------------------

```{=html}
<details open>
```
```{=html}
<summary>
```
`<b>`{=html}🧪 Storybook Stories Overview`</b>`{=html}
```{=html}
</summary>
```
  -----------------------------------------------------------------------
  Story                     Description
  ------------------------- ---------------------------------------------
  `CalendarView/Month`      Interactive monthly layout with event
                            previews

  `CalendarView/Week`       7-day grid with draggable scheduling

  `EventModal/Create`       New event creation with validations

  `EventModal/Edit`         Edit existing event with persistence

  `Tooltip/Preview`         Hover preview for time + description
  -----------------------------------------------------------------------

```{=html}
</details>
```

------------------------------------------------------------------------

## 🧰 Tech Stack

  -----------------------------------------------------------------------
  Stack                         Purpose
  ----------------------------- -----------------------------------------
  ⚛️ **React 18 + TypeScript**  Core framework for strong typing &
                                modular UI

  💨 **Tailwind CSS**           Utility-first responsive design

  🧱 **Storybook 8**            Visual documentation & component testing

  🪄 **Framer Motion**          Smooth motion & transition effects

  🎨 **Shadcn/UI + Lucide       Elegant UI & modern icons
  Icons**                       

  💾 **LocalStorage API**       Persistent event saving

  ⚙️ **Vite + Vitest**          High-speed build & testing pipeline
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 💡 Design Philosophy

> "Usability defines good design --- Scalability defines great
> engineering."

-   **User-Centric Experience**: Focused on accessibility and intuitive
    interactions.\
-   **Component-Driven Development**: Modular and reusable for
    enterprise use.\
-   **Performance-Optimized**: Minimal re-renders and lazy-loaded
    resources.

------------------------------------------------------------------------

## 📊 Performance & Accessibility

  Metric                         Score
  ------------------------------ --------------------
  **Accessibility (WCAG 2.1)**   ✅ 100 / 100
  **Performance**                ⚡ 95+
  **SEO & Best Practices**       💯 Fully Compliant

------------------------------------------------------------------------

## 📜 License

This project is released under the **MIT License** --- open for both
personal and commercial use.

------------------------------------------------------------------------

## 📬 Connect with Me

👤 **Aaditya Gupta**\
📧 <aaditya.workconnect@gmail.com>\
🌐 [Portfolio](https://aadityaguptaaa.github.io/My-Portfolio/)\
💼 [GitHub](https://github.com/aadityaguptaaa) •
[LinkedIn](https://www.linkedin.com/in/aadityaguptaaa/)

------------------------------------------------------------------------

```{=html}
<h3 align="center">
```
💫 "Design for usability. Build for scalability. Deliver with
precision."
```{=html}
</h3>
```
