import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { TiThMenu } from "react-icons/ti";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import routePaths from "../../routes/routePaths";

export const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { name: "Dashboard", path: routePaths.dashboard, icon: FaHome },
    { name: "Users", path: routePaths.listUsers, icon: HiUsers },
  ];

  return (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <button
        type="button"
        className="fixed bottom-4 right-4 bg-blue-600 dark:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={toggleMenu}
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <IoCloseOutline size={24} /> : <TiThMenu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white opacity-60 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-xl z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Menu
            </h2>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                  onClick={toggleMenu}
                >
                  <Icon
                    className={`mr-4 h-6 w-6 ${
                      active
                        ? "text-blue-500 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};
