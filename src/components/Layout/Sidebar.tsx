import React from 'react';
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

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['all'] },
    { id: 'upload', label: 'Document Upload', icon: Upload, roles: ['all'] },
    { id: 'summaries', label: 'AI Summaries', icon: FileText, roles: ['all'] },
    { id: 'search', label: 'Search & Filter', icon: Search, roles: ['all'] },
    { id: 'compliance', label: 'Compliance Tracker', icon: Shield, roles: ['all'] },
    { id: 'knowledge', label: 'Knowledge Repository', icon: BookOpen, roles: ['all'] },
    { id: 'collaboration', label: 'Collaboration', icon: MessageSquare, roles: ['all'] },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'executive_director'] },
    { id: 'users', label: 'User Management', icon: Users, roles: ['admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin'] }
  ];

  const hasAccess = (roles: string[]) => {
    return roles.includes('all') || roles.includes(user?.role || '');
  };

  return (
    <div className="bg-white shadow-sm border-r border-gray-200 w-64 min-h-screen">
      <div className="p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            if (!hasAccess(item.roles)) return null;
            
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;