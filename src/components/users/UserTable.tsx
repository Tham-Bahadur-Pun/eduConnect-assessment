import React from 'react';
import { Link } from 'react-router-dom';

import type { User, SortConfig } from '../../types';
import { Avatar as UserAvatar } from '../ui/Avatar';
import { StatusBadge } from '../ui/StatusBadge';
import { RoleBadge } from '../ui/RoleBadge';
import { SortButton } from '../ui/SortButton';
import { Loader } from '../ui/Loader';

interface UserTableProps {
  users: User[];
  loading: boolean;
  sortConfig?: SortConfig;
  onSort: (key: keyof User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  sortConfig,
  onSort,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader size="large" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg shadow">
        <p className="text-lg text-gray-500 dark:text-gray-400">No users found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              User
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <SortButton
                label="Role"
                active={sortConfig?.key === 'role'}
                direction={sortConfig?.direction}
                onClick={() => onSort('role')}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <SortButton
                label="Status"
                active={sortConfig?.key === 'status'}
                direction={sortConfig?.direction}
                onClick={() => onSort('status')}
              />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr 
              key={user.id}
              className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <Link  to={`/users/${user.id}`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserAvatar src={user.avatar} name={user.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </div>
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={user.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};