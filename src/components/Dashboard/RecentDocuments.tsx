import React from 'react';
import { FileText, Clock, User, Globe } from 'lucide-react';
import { Document } from '../../types';

interface RecentDocumentsProps {
  documents: Document[];
}

const RecentDocuments: React.FC<RecentDocumentsProps> = ({ documents }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      ready: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLanguageIcon = (language: string) => {
    if (language === 'both') return <Globe className="h-4 w-4 text-purple-500" />;
    if (language === 'malayalam') return <Globe className="h-4 w-4 text-green-500" />;
    return <Globe className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Documents</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {documents.slice(0, 5).map((doc) => (
          <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                <p className="text-sm text-gray-600 mt-1">{doc.type}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    {doc.uploadedBy}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    {getLanguageIcon(doc.language)}
                    <span className="ml-1 text-xs text-gray-500 capitalize">{doc.language}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDocuments;