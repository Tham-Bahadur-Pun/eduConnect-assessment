import React from 'react';

type RoleType = 'admin' | 'user' | 'editor';

interface RoleBadgeProps {
  role: RoleType;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const getRoleStyles = () => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'editor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'user':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleStyles()}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};