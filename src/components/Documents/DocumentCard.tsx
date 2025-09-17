import React from 'react';
import { FileText, Download, Eye, MessageSquare, Calendar, Tag } from 'lucide-react';
import { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  onView: (doc: Document) => void;
  onDownload: (doc: Document) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onView, onDownload }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      ready: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getLanguageColor = (language: string) => {
    const colors = {
      english: 'bg-blue-100 text-blue-800',
      malayalam: 'bg-green-100 text-green-800',
      both: 'bg-purple-100 text-purple-800'
    };
    return colors[language as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate w-[200px]">{document.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{document.type}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onView(document)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDownload(document)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        {document.summary && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900 line-clamp-2">{document.summary}</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(document.status)}`}>
            {document.status}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLanguageColor(document.language)}`}>
            {document.language}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
            {document.department}
          </span>
        </div>

        {document.tags.length > 0 && (
          <div className="mt-3 flex items-center space-x-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {document.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(document.uploadedAt).toLocaleDateString()}
            </div>
            <span>{document.fileSize}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>2 comments</span>
          </div>
        </div>

        {document.deadline && (
          <div className="mt-2 flex items-center text-sm text-orange-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Deadline: {new Date(document.deadline).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;