import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className, children, ...rest }) => {
  const base = "px-3 py-1 rounded-md focus:outline-none focus:ring-2 transition";
  const cls = clsx(
    base,
    {
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300": variant === "primary",
      "bg-transparent text-gray-800 hover:bg-gray-100": variant === "ghost",
      "border border-gray-200 text-gray-800 hover:bg-gray-50": variant === "outline"
    },
    className
  );
  return <button className={cls} {...rest}>{children}</button>;
};
