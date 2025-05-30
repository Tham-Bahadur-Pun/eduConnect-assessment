import React from 'react';
import { Link } from 'react-router-dom';
import { FiRefreshCcw } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">
          404
        </h1>
        <h2 className="text-3xl font-semibold mt-4 text-gray-800 dark:text-gray-200">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaHome size={16} className="mr-2" /> Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiRefreshCcw size={16} className="mr-2" /> Reload Page
          </button>
        </div>
      </div>
    </div>
  );
};
