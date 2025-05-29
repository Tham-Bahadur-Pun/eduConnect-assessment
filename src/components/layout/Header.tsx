import React from 'react';
import { Link } from 'react-router-dom';
import { PiUsersThreeFill } from "react-icons/pi";
import { ThemeToggle } from '../ui/ThemeToggle';
// import { SearchBar } from '../ui/SearchBar';
// import { useUsers } from '../../context/UserContext';

export const Header: React.FC = () => {
//   const { searchTerm, setSearchTerm } = useUsers();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <PiUsersThreeFill className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Dasboard</span>
            </Link>
          </div>

          {/* <div className="flex-1 mx-8 hidden md:block">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search users by name or email..."
            />
          </div> */}

          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Mobile search - only visible on small screens */}
      {/* <div className="md:hidden px-4 pb-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search users..."
        />
      </div> */}
    </header>
  );
};