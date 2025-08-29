import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const GlassSelect = ({ label, value, onChange, options = [], className = '' }) => {
  return (
    <label className={`relative w-full inline-flex items-center h-10 backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 dark:border-t-white/60  border-t-gray-400/60 dark:border-r-white/60 border-r-gray-400/60 border-b-blue-400/60 px-2 border-l-blue-400/60 ${className}`}>
      <span className="mr-2 text-xs dark:text-white/70 text-black/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="appearance-none bg-transparent outline-none text-[10px] font-semibold dark:text-white text-black min-w-[77px]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="dark:text-white text-black">
            {opt.label}
          </option>
        ))}
      </select>
      <FiChevronDown className="pointer-events-none absolute right-2 dark:text-white/80 text-black/70" size={16} />
    </label>
  );
};

export default GlassSelect;


