import React from 'react';
import { LuSunMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors
      hover:cursor-pointer"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <LuSun className="h-5 w-5 text-yellow-300" />
      ) : (
        <LuSunMoon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
};