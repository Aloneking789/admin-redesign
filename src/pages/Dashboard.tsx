import React from 'react';
import { AreaChart, Card, Title } from '@tremor/react';
import StatsGrid from '../components/DashboardStats';

const chartdata = [
  { date: 'Jan 22', Users: 2890, Providers: 2338 },
  { date: 'Feb 22', Users: 2756, Providers: 2103 },
  { date: 'Mar 22', Users: 3322, Providers: 2194 },
  { date: 'Apr 22', Users: 3470, Providers: 2108 },
  { date: 'May 22', Users: 3475, Providers: 1812 },
  { date: 'Jun 22', Users: 3129, Providers: 1726 },
];

const Dashboard = () => {
  const mockStats = {
    totalUsers: 15234,
    activeUsers: 12453,
    pendingProviders: 234,
    activeProviders: 1432,
    totalServices: 3256,
    totalCategories: 128,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back, here's what's happening</p>
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#00C8C8]">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      <StatsGrid stats={mockStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <Title>Platform Growth</Title>
          <AreaChart
            className="h-72 mt-4"
            data={chartdata}
            index="date"
            categories={['Users', 'Providers']}
            colors={['cyan', 'indigo']}
          />
        </Card>

        <Card>
          <Title>Recent Activity</Title>
          <div className="mt-4 space-y-4">
            {/* Add recent activity items here */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;