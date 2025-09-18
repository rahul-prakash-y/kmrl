import React, { useState, useEffect } from 'react';
import { FileText, Users, Shield, TrendingUp, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import StatsCard from '../Dashboard/StatsCard';
import AlertsList from '../Dashboard/AlertsList';
import RecentDocuments from '../Dashboard/RecentDocuments';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/apiClient';
import { Document, Alert } from '../../types';

// Define a type for the dashboard stats
interface DashboardStats {
  totalDocuments: number;
  aiSummariesGenerated: number;
  pendingReviews: number;
  complianceIssues: number;
  activeUsers?: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // State for all dashboard data
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get('/dashboard');
        const { data } = response.data;

        setStats(data.stats);
        setRecentDocuments(data.recentDocuments.map((doc: any) => ({ ...doc, id: doc._id })));
        setAlerts(data.alerts.map((alert: any) => ({ ...alert, id: alert._id })));
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getDashboardStats = () => {
    if (!stats) return [];
    
    const baseStats = [
      { title: 'Total Documents', value: stats.totalDocuments, icon: FileText, color: 'blue' as const },
      { title: 'AI Summaries Generated', value: stats.aiSummariesGenerated, icon: TrendingUp, color: 'green' as const },
      { title: 'Pending Reviews', value: stats.pendingReviews, icon: Clock, color: 'yellow' as const },
      { title: 'Compliance Issues', value: stats.complianceIssues, icon: AlertTriangle, color: 'red' as const }
    ];

    if (user?.role === 'admin' && stats.activeUsers !== undefined) {
      baseStats.push({ title: 'Active Users', value: stats.activeUsers, icon: Users, color: 'purple' as const });
    }

    return baseStats;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-4 text-gray-600">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>;
  }

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
        <AlertsList alerts={alerts} />
        <RecentDocuments documents={recentDocuments} />
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
