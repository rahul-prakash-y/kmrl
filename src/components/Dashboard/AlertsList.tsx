import React from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Alert } from '../../types';

interface AlertsListProps {
  alerts: Alert[];
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  const getAlertIcon = (type: string, priority: string) => {
    if (priority === 'critical') return <XCircle className="h-5 w-5 text-red-500" />;
    if (priority === 'high') return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    if (type === 'deadline') return <Clock className="h-5 w-5 text-yellow-500" />;
    return <CheckCircle className="h-5 w-5 text-blue-500" />;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: 'border-l-red-500 bg-red-50',
      high: 'border-l-orange-500 bg-orange-50',
      medium: 'border-l-yellow-500 bg-yellow-50',
      low: 'border-l-blue-500 bg-blue-50'
    };
    return colors[priority as keyof typeof colors] || 'border-l-gray-500 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {alerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className={`p-4 border-l-4 ${getPriorityColor(alert.priority)}`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getAlertIcon(alert.type, alert.priority)}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="text-xs text-gray-500">
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </span>
                  {alert.department && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {alert.department}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsList;