import React, { useState } from 'react';
import { MessageSquare, Users, Paperclip, Send, Eye } from 'lucide-react';
import { mockComments, mockDocuments } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

const Collaboration: React.FC = () => {
  const { user } = useAuth();
  const [selectedDocument, setSelectedDocument] = useState(mockDocuments[0].id);
  const [newComment, setNewComment] = useState('');

  const documentComments = mockComments.filter(comment => comment.documentId === selectedDocument);
  const selectedDoc = mockDocuments.find(doc => doc.id === selectedDocument);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Here you would typically submit the comment to your backend
    console.log('New comment:', {
      documentId: selectedDocument,
      content: newComment,
      userId: user?.id,
      userName: user?.name
    });
    
    setNewComment('');
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      station_controller: 'bg-blue-100 text-blue-800',
      engineer: 'bg-green-100 text-green-800',
      procurement_officer: 'bg-purple-100 text-purple-800',
      hr_officer: 'bg-pink-100 text-pink-800',
      finance_officer: 'bg-yellow-100 text-yellow-800',
      executive_director: 'bg-indigo-100 text-indigo-800'
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Collaboration Hub</h1>
        <p className="mt-1 text-sm text-gray-600">
          Discuss documents, share insights, and collaborate with your team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Active Discussions
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {mockDocuments.map(doc => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocument(doc.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  selectedDocument === doc.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <p className="text-sm font-medium text-gray-900 truncate">{doc.title}</p>
                <p className="text-xs text-gray-500 mt-1">{doc.department}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>2 comments</span>
                  <Users className="h-3 w-3 ml-2 mr-1" />
                  <span>3 collaborators</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Discussion Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Document Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedDoc?.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedDoc?.type} • {selectedDoc?.department}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {selectedDoc?.language}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                    {selectedDoc?.status}
                  </span>
                </div>
              </div>
              <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                <Eye className="h-4 w-4 mr-1" />
                View Document
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Discussion</h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {documentComments.map(comment => (
                <div key={comment.id} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {comment.userName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{comment.userName}</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleColor(comment.userRole)}`}>
                          {comment.userRole.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* New Comment Form */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSubmitComment} className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Add your comment or feedback..."
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
                    <Paperclip className="h-4 w-4 mr-1" />
                    Attach file
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Comment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Document Annotations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Annotations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Page 2, Section 3.1</p>
                    <p className="text-sm text-yellow-800 mt-1">
                      "The Malayalam translation needs clarification on technical terms."
                    </p>
                  </div>
                  <span className="text-xs text-yellow-600">Priya Nair</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Page 5, Emergency Procedures</p>
                    <p className="text-sm text-blue-800 mt-1">
                      "Consider adding evacuation time estimates for each station."
                    </p>
                  </div>
                  <span className="text-xs text-blue-600">Mohammed Rashid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;