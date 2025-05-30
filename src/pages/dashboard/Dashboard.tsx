import { useEffect, useState } from 'react';
import { FaUserCheck, FaUserFriends, FaUserTimes } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import {
  StatCard,
  type StatCardProps,
} from '../../components/dashboard/StatCard';
import { UserDistributionChart } from '../../components/dashboard/UserDistributionChart';
import { Loader } from '../../components/ui/Loader';
import { userService } from '../../services/userServices';
import type { UserStats } from '../../types';

const Dashboard = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await userService.getUserStats();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch user stats:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md">
        <p className="text-red-800 dark:text-red-200">{error}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const chartData = {
    labels: ['Admins', 'Editors', 'Users'],
    values: [
      stats.roleDistribution.admin,
      stats.roleDistribution.editor,
      stats.roleDistribution.user,
    ],
  };

  const statData: StatCardProps[] = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FaUserFriends,
      color: 'blue',
    },

    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: FaUserCheck,
      color: 'green',
    },
    {
      title: 'Inactive Users',
      value: stats.inactiveUsers,
      icon: FaUserTimes,
      color: 'red',
    },
    {
      title: 'Admin Users',
      value: stats.roleDistribution.admin,
      icon: RiAdminFill,
      color: 'purple',
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statData.map((stat, index) => (
          <StatCard
            key={index + 'stat'}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            User Distribution by Role
          </h2>
          <div className="h-64">
            <UserDistributionChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
