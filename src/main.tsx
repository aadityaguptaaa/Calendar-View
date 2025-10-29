import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css"; // ✅ This line must exist

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
