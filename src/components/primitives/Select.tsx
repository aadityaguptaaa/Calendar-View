import React from "react";

interface Option { value: string; label: string; }
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

export const Select: React.FC<SelectProps> = ({ options, className, ...rest }) => {
  return (
    <select className={`px-2 py-1 border rounded ${className}`} {...rest}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
};
