import React, { useState, useEffect, useRef } from 'react';
import { IoIosClose } from 'react-icons/io';
import { MdFilterListAlt } from 'react-icons/md';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  title,
  options,
  selectedValues,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const clearAll = () => {
    onChange([]);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className={`inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer
          ${
            selectedValues.length > 0
              ? 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 dark:hover:bg-blue-800'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-blue-900 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-blue-900/30'
          }
        `}
      >
        <MdFilterListAlt size={16} className="mr-2" />
        {title}
        {selectedValues.length > 0 && (
          <span className="ml-1.5 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200">
            {selectedValues.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Filter by {title}
              </span>
              {selectedValues.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center cursor-pointer"
                >
                  <IoIosClose size={12} className="mr-1" />
                  Clear
                </button>
              )}
            </div>

            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                role="menuitem"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => {}} // just to prevent React warning
                  id={`filter-${title}-${option.value}`}
                />
                <label
                  htmlFor={`filter-${title}-${option.value}`}
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-200"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
