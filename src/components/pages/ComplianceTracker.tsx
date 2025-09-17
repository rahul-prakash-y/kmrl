import React from 'react';
import { Shield, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import ComplianceTable from '../Compliance/ComplianceTable';
import { mockCompliance } from '../../data/mockData';

const ComplianceTracker: React.FC = () => {
  const upcomingDeadlines = mockCompliance.filter(item => {
    const deadline = new Date(item.deadline);
    const now = new Date();
    const daysDiff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return daysDiff <= 7 && daysDiff >= 0;
  });

  const overdueTasks = mockCompliance.filter(item => item.status === 'overdue');

  const stats = [
    {
      title: 'Total Compliance Items',
      value: mockCompliance.length,
      icon: Shield,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Upcoming Deadlines',
      value: upcomingDeadlines.length,
      icon: Calendar,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Overdue Tasks',
      value: overdueTasks.length,
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Completed This Month',
      value: mockCompliance.filter(item => item.status === 'completed').length,
      icon: CheckCircle,
      color: 'bg-green-50 text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compliance Tracker</h1>
        <p className="mt-1 text-sm text-gray-600">
          Monitor regulatory compliance, deadlines, and document requirements
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {(upcomingDeadlines.length > 0 || overdueTasks.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingDeadlines.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-800 mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Upcoming Deadlines (Next 7 Days)
              </h3>
              <div className="space-y-2">
                {upcomingDeadlines.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-sm text-yellow-700">{item.title}</span>
                    <span className="text-sm font-medium text-yellow-800">
                      {new Date(item.deadline).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {overdueTasks.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-800 mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Overdue Tasks
              </h3>
              <div className="space-y-2">
                {overdueTasks.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-sm text-red-700">{item.title}</span>
                    <span className="text-sm font-medium text-red-800">
                      {new Date(item.deadline).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compliance Table */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">All Compliance Items</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Add New Item
          </button>
        </div>
        <ComplianceTable items={mockCompliance} />
      </div>

      {/* Compliance Guidelines */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Safety Compliance</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Monthly safety inspections required</li>
              <li>• Emergency drill documentation</li>
              <li>• Equipment maintenance records</li>
              <li>• Staff training certifications</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Financial Compliance</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Quarterly financial reports</li>
              <li>• Budget variance analysis</li>
              <li>• Audit preparation documents</li>
              <li>• Expenditure approvals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTracker;