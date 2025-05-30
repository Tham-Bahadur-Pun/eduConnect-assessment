export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'editor';
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  department: string;
  location: {
    city: string;
    state: string;
  };
  joinDate?: string;
  lastActive?: string;

}

export interface DummyJSONResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: keyof User;
  direction: SortDirection;
}

export interface FilterOptions {
  role: string[];
  status: string[];
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  roleDistribution: {
    admin: number;
    user: number;
    editor: number;
  };
}