import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';

const RoleSelector: React.FC = () => {
  const { user, switchRole } = useAuth();

  const roles: { value: UserRole; label: string; color: string }[] = [
    { value: 'admin', label: 'Admin', color: 'bg-red-100 text-red-800' },
    { value: 'station_controller', label: 'Station Controller', color: 'bg-blue-100 text-blue-800' },
    { value: 'engineer', label: 'Engineer', color: 'bg-green-100 text-green-800' },
    { value: 'procurement_officer', label: 'Procurement Officer', color: 'bg-purple-100 text-purple-800' },
    { value: 'hr_officer', label: 'HR Officer', color: 'bg-pink-100 text-pink-800' },
    { value: 'finance_officer', label: 'Finance Officer', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'executive_director', label: 'Executive Director', color: 'bg-indigo-100 text-indigo-800' }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Switch Role (Demo)</h3>
        <div className="space-y-2">
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => switchRole(role.value)}
              className={`w-fit text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                user?.role === role.value
                  ? role.color
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;