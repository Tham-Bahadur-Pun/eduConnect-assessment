import React from 'react';
import { Link } from 'react-router-dom';
import { PiUsersThreeFill } from 'react-icons/pi';

import { ThemeToggle } from '../ui/ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <PiUsersThreeFill className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                User Dashboard
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
