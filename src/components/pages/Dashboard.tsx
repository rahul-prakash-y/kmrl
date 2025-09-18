// src/components/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { FileText, Users, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import StatsCard from '../Dashboard/StatsCard';
import AlertsList from '../Dashboard/AlertsList';
import RecentDocuments from '../Dashboard/RecentDocuments';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/apiClient'; // Import apiClient
import { Document, Alert } from '../../types'; // Keep types for state

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // State to hold data from the API
  const [documents, setDocuments] = useState<Document[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch documents
        const docsResponse = await apiClient.get('/documents');
        setDocuments(docsResponse.data.data);

        // NOTE: You'll need to create an alerts endpoint on your backend.
        // For now, this will fail gracefully or you can keep using mockAlerts.
        // const alertsResponse = await apiClient.get('/alerts');
        // setAlerts(alertsResponse.data.data);

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // ... (keep the rest of the component logic like getDashboardStats)

  if (loading) {
    return <div>Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* ... (rest of the JSX, but pass the state variables) */}
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsList alerts={[]} /> {/* Pass alerts state here */}
        <RecentDocuments documents={documents} /> {/* Pass documents state here */}
      </div>

      {/* ... (rest of the JSX) */}
    </div>
  );
};

export default Dashboard;