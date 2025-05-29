import React from 'react';
import type { IconType } from 'react-icons';



export interface StatCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow';
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon,
  color = 'blue'
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-600 dark:text-blue-300',
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-600 dark:text-green-300',
    },
    red: {
      bg: 'bg-red-100 dark:bg-red-900',
      text: 'text-red-600 dark:text-red-300',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-600 dark:text-purple-300',
    },
    yellow: {
      bg: 'bg-yellow-100 dark:bg-yellow-900',
      text: 'text-yellow-600 dark:text-yellow-300',
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-5 transition-all hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
          <Icon className={`h-6 w-6 ${colorClasses[color].text}`} />
      </div>
    </div>
  );
};
