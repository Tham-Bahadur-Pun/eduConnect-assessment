import { mockUsers } from '../data/mockData';
import type { User, UserStats, FilterOptions, SortConfig } from '../types';

const transformUser = (user: User): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role || 'user',
  status: user.status || 'active',
  avatar: user.avatar,
  department: user.department || '',
  location: {
    city: user.location?.city || '',
    state: user.location?.state || ''
  },
  joinDate: user.joinDate,
  lastActive: user.lastActive || new Date().toISOString()
});

export const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      return mockUsers.map(transformUser);
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (id: number): Promise<User | undefined> => {
    try {
      const user = mockUsers.find(u => u.id === id);
      return user ? transformUser(user) : undefined;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  updateUser: async (updatedUser: User): Promise<User> => {
    try {
      const index = mockUsers.findIndex(u => u.id === updatedUser.id);
      if (index === -1) throw new Error('User not found');

      mockUsers[index] = { ...mockUsers[index], ...updatedUser };
      return transformUser(mockUsers[index]);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  searchUsers: async (query: string): Promise<User[]> => {
    try {
      const searchTerm = query.toLowerCase();
      const filteredUsers = mockUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
      return filteredUsers.map(transformUser);
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  getUserStats: async (): Promise<UserStats> => {
    try {
      const users = await userService.getUsers();

      const stats: UserStats = {
        totalUsers: users.length,
        activeUsers: users.filter(user => user.status === 'active').length,
        inactiveUsers: users.filter(user => user.status === 'inactive').length,
        roleDistribution: {
          admin: users.filter(user => user.role === 'admin').length,
          user: users.filter(user => user.role === 'user').length,
          editor: users.filter(user => user.role === 'editor').length,
        }
      };

      return stats;
    } catch (error) {
      console.error('Error calculating user stats:', error);
      throw error;
    }
  },

  filterAndSortUsers: async (
    users: User[],
    filters: FilterOptions,
    sortConfig?: SortConfig,
    search?: string
  ): Promise<User[]> => {
    let filteredUsers = [...users];

    if (filters.role.length > 0) {
      filteredUsers = filteredUsers.filter(user => filters.role.includes(user.role));
    }

    if (filters.status.length > 0) {
      filteredUsers = filteredUsers.filter(user => filters.status.includes(user.status));
    }

    if (search && search.trim() !== '') {
      const searchTerm = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    }

    if (sortConfig) {
      filteredUsers.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const comparison = aValue.localeCompare(bValue);
          return sortConfig.direction === 'asc' ? comparison : -comparison;
        }

        if (aValue! < bValue!) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue! > bValue!) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredUsers;
  }
};