import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import routePaths from "../../routes/routePaths";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { name: "Dashboard", path: routePaths.dashboard, icon: FaHome },
    { name: "Users", path: routePaths.listUsers, icon: HiUsers },
    // { name: 'Settings', path: '/settings', icon: Settings },
    // { name: 'Analytics', path: '/analytics', icon: BarChart },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen transition-colors">
      <div className="h-full flex flex-col">
        <div className="flex-grow py-4">
          <nav className="mt-8 px-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${
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
    </aside>
  );
};
