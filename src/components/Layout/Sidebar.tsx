import React from 'react';
import { NavLink } from 'react-router'; // Import NavLink
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  Search, 
  Shield, 
  BookOpen, 
  Users, 
  MessageSquare,
  BarChart3,
  Settings
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'station_controller', 'engineer', 'procurement_officer', 'hr_officer', 'finance_officer', 'executive_director'] },
    { id: 'upload', path: '/upload', label: 'Document Upload', icon: Upload, roles: ['admin', 'station_controller', 'engineer', 'procurement_officer', 'hr_officer', 'finance_officer', 'executive_director'] },
    { id: 'summaries', path: '/summaries', label: 'AI Summaries', icon: FileText, roles: ['admin', 'station_controller', 'engineer', 'procurement_officer', 'hr_officer', 'finance_officer', 'executive_director'] },
    { id: 'search', path: '/search', label: 'Search & Filter', icon: Search, roles: ['admin', 'station_controller', 'engineer', 'procurement_officer', 'hr_officer', 'finance_officer', 'executive_director'] },
    { id: 'compliance', path: '/compliance', label: 'Compliance Tracker', icon: Shield, roles: ['admin', 'station_controller', 'engineer', 'procurement_officer', 'hr_officer', 'finance_officer', 'executive_director'] },
    { id: 'knowledge', path: '/knowledge', label: 'Knowledge Repository', icon: BookOpen, roles: ['admin', 'station_controller', 'engineer', 'procurement_officer', 'hr_officer', 'finance_officer', 'executive_director'] },
    { id: 'collaboration', path: '/collaboration', label: 'Collaboration', icon: MessageSquare, roles: ['admin', 'station_controller', 'engineer', 'procurement_officer', 'hr_officer', 'finance_officer', 'executive_director'] },
    { id: 'users', path: '/users', label: 'User Management', icon: Users, roles: ['admin'] }
  ];

  const hasAccess = (roles: string[]) => {
    console.log('Checking access for roles:', roles);
    console.log('Current user role:', user?.role);
    return roles.includes(user?.role.toLocaleLowerCase() || '');
  };

  return (
    <div className="bg-white shadow-sm border-r border-gray-200 w-64 min-h-screen">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            if (!hasAccess(item.roles)) return null;
            console.log(item);
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
