import React from 'react';
import { LuArrowUp, LuArrowDown, LuArrowUpDown } from 'react-icons/lu';

import type { SortDirection } from '../../types';

interface SortButtonProps {
  label: string;
  active: boolean;
  direction?: SortDirection;
  onClick: () => void;
}

export const SortButton: React.FC<SortButtonProps> = ({
  label,
  active,
  direction,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-2 py-1 rounded text-sm ${
        active
          ? 'font-medium text-blue-600 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {label}
      <span className="ml-1">
        {active ? (
          direction === 'asc' ? (
            <LuArrowUp size={14} className="text-blue-600 dark:text-blue-400" />
          ) : (
            <LuArrowDown size={14} className="text-blue-600 dark:text-blue-400" />
          )
        ) : (
          <LuArrowUpDown size={14} className="text-gray-400 dark:text-gray-500" />
        )}
      </span>
    </button>
  );
};