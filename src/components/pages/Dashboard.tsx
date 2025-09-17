import React from 'react';
import { FileText, Users, Shield, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import StatsCard from '../Dashboard/StatsCard';
import AlertsList from '../Dashboard/AlertsList';
import RecentDocuments from '../Dashboard/RecentDocuments';
import { mockDocuments, mockAlerts } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getDashboardStats = () => {
    const baseStats = [
      { title: 'Total Documents', value: 247, icon: FileText, color: 'blue' as const, trend: { value: '+12%', isPositive: true } },
      { title: 'AI Summaries Generated', value: 189, icon: TrendingUp, color: 'green' as const, trend: { value: '+23%', isPositive: true } },
      { title: 'Pending Reviews', value: 8, icon: Clock, color: 'yellow' as const },
      { title: 'Compliance Issues', value: 3, icon: AlertTriangle, color: 'red' as const }
    ];

    // Add role-specific stats
    if (user?.role === 'admin') {
      baseStats.push({ title: 'Active Users', value: 42, icon: Users, color: 'purple' as const });
    }

    return baseStats;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {user?.name}. Here's what's happening with your documents.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getDashboardStats().map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsList alerts={mockAlerts} />
        <RecentDocuments documents={mockDocuments} />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="h-5 w-5 text-gray-400 mr-2" />
            Upload New Document
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Shield className="h-5 w-5 text-gray-400 mr-2" />
            Check Compliance
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;