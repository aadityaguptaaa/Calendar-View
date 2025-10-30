import React from "react";

interface TooltipProps {
  text: string;
  visible: boolean;
  x: number;
  y: number;
}

const Tooltip: React.FC<TooltipProps> = ({ text, visible, x, y }) => {
  if (!visible) return null;
  return (
    <div
      className="fixed z-50 text-xs bg-neutral-900 text-white px-2 py-1 rounded-md shadow-lg transition-opacity duration-100"
      style={{ top: y + 8, left: x + 8 }}
    >
      {text}
    </div>
  );
};

export default Tooltip;
