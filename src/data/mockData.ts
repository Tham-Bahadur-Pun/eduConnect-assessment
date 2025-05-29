import type { User, UserStats } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-01-15',
    lastActive: '2023-09-28',
    department: 'Engineering',
    location: {
        city: 'San Francisco',
        state: 'California'
    }
  },
  {
    id: 2,
    name: 'Samantha Smith',
    email: 'samantha.smith@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-03-22',
    lastActive: '2023-09-27',
    department: 'Marketing',
    location: {
        city: 'New York',
        state: 'New York'
    }
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'editor',
    status: 'inactive',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-05-10',
    lastActive: '2023-08-15',
    department: 'Design',
    location: {
        city: 'Los Angeles',
        state: 'California'
    }
  },
  {
    id: 4,
    name: 'Jessica Lee',
    email: 'jessica.lee@example.com',
    role: 'user',
    status: 'pending',
    avatar: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-09-05',
    lastActive: '2023-09-26',
    department: 'Finance',
    location: {
        city: 'Chicago',
        state: 'Illinois'
    }
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    role: 'editor',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-02-18',
    lastActive: '2023-09-28',
    department: 'Product',
    location: {
        city: 'Seattle',
        state: 'Washington'
    }
  },
  {
    id: 6,
    name: 'Sarah Garcia',
    email: 'sarah.garcia@example.com',
    role: 'user',
    status: 'inactive',
    avatar: 'https://images.pexels.com/photos/1499327/pexels-photo-1499327.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-08-12',
    lastActive: '2023-07-30',
    department: 'Sales',
    location:{
        city: 'Miami',
        state: 'Florida'
    }
  },
  {
    id: 7,
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-04-25',
    lastActive: '2023-09-27',
    department: 'Engineering',
    location: {
        city: 'Austin',
        state: 'Texas'
    }
  },
  {
    id: 8,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-06-30',
    lastActive: '2023-09-25',
    department: 'Marketing',
    location: {
        city: 'Boston',
        state: 'Massachusetts'
    }
  },
  {
    id: 9,
    name: 'James Miller',
    email: 'james.miller@example.com',
    role: 'editor',
    status: 'pending',
    avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-10-15',
    lastActive: '2023-09-20',
    department: 'Design',
    location: {
        city: 'Denver',
        state: 'Colorado'
    }
  },
  {
    id: 10,
    name: 'Lisa Brown',
    email: 'lisa.brown@example.com',
    role: 'user',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-07-08',
    lastActive: '2023-09-28',
    department: 'HR',
    location: {
        city: 'Portland',
        state: 'Oregon'
    }
  },
  {
    id: 11,
    name: 'Thomas White',
    email: 'thomas.white@example.com',
    role: 'user',
    status: 'inactive',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-03-05',
    lastActive: '2023-08-10',
    department: 'Finance',
    location: {
        city: 'Atlanta',
        state: 'Georgia'
    }
  },
  {
    id: 12,
    name: 'Amanda Martinez',
    email: 'amanda.martinez@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-01-20',
    lastActive: '2023-09-27',
    department: 'Engineering',
    location: {
        city: 'San Diego',
        state: 'California'
    }
  }
];

export const calculateUserStats = (): UserStats => {
  const activeUsers = mockUsers.filter(user => user.status === 'active').length;
  const inactiveUsers = mockUsers.filter(user => user.status === 'inactive').length;
  
  return {
    totalUsers: mockUsers.length,
    activeUsers,
    inactiveUsers,
    roleDistribution: {
      admin: mockUsers.filter(user => user.role === 'admin').length,
      user: mockUsers.filter(user => user.role === 'user').length,
      editor: mockUsers.filter(user => user.role === 'editor').length,
    }
  };
};