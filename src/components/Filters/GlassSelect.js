import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const GlassSelect = ({ label, value, onChange, options = [], className = '' }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const handleSelect = (val) => {
    onChange?.(val);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-flex cursor-pointer">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={`relative w-full inline-flex items-center h-10 backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 dark:border-t-white/60  border-t-gray-400/60 dark:border-r-white/60 border-r-gray-400/60 border-b-blue-400/60 px-2 border-l-blue-400/60 ${className}`}
      >
        <span className="mr-2 text-sm dark:text-white/70 text-black/70">{label}</span>
        <span className="text-sm font-semibold text-left dark:text-white text-black truncate min-w-[77px]">
          {selectedOption ? selectedOption.label : ''}
        </span>
        <FiChevronDown
          className={`pointer-events-none absolute right-2 transition-transform dark:text-white/80 text-black/70 ${open ? 'rotate-180' : ''}`}
          size={16}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 min-w-[180px] rounded-2xl shadow-xl border border-white/20 bg-white dark:bg-neutral-900 p-2">
          {options.map((opt) => {
            const isActive = opt.value === (selectedOption && selectedOption.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full flex items-center justify-between text-left px-3 py-2 rounded-xl transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${
                  isActive ? 'font-semibold   text-black ' : ' text-black/80'
                }`}
              >
                <span>{opt.label}</span>
                <span className={`ml-4 ${isActive ? 'opacity-100' : 'opacity-0'}`}>✓</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GlassSelect;


