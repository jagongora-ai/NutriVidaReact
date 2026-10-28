import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onChange, options, placeholder = '-- Seleccionar --' }) => (
  <select
    value={value}
    onChange={onChange}
    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);