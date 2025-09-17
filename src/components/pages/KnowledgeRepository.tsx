import React, { useState } from 'react';
import { BookOpen, Search, Tag, Clock, Star, FileText } from 'lucide-react';

const KnowledgeRepository: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const knowledgeItems = [
    {
      id: '1',
      title: 'Metro Operations Best Practices',
      category: 'Operations',
      type: 'Guide',
      summary: 'Comprehensive guide covering daily operations, emergency procedures, and efficiency optimization strategies.',
      tags: ['operations', 'best-practices', 'emergency'],
      lastUpdated: '2024-12-15',
      rating: 4.8,
      views: 245
    },
    {
      id: '2',
      title: 'Financial Planning Framework',
      category: 'Finance',
      type: 'Framework',
      summary: 'Detailed framework for annual budget planning, resource allocation, and financial risk assessment.',
      tags: ['finance', 'planning', 'budget'],
      lastUpdated: '2024-12-10',
      rating: 4.6,
      views: 189
    },
    {
      id: '3',
      title: 'Technical Maintenance Procedures',
      category: 'Engineering',
      type: 'Procedure',
      summary: 'Step-by-step maintenance procedures for tracks, signals, and electrical systems.',
      tags: ['maintenance', 'technical', 'procedures'],
      lastUpdated: '2024-12-08',
      rating: 4.9,
      views: 312
    },
    {
      id: '4',
      title: 'HR Policy Handbook - Malayalam',
      category: 'Human Resources',
      type: 'Policy',
      summary: 'Complete HR policies and procedures translated into Malayalam for local staff.',
      tags: ['hr', 'policy', 'malayalam'],
      lastUpdated: '2024-12-05',
      rating: 4.7,
      views: 156
    }
  ];

  const categories = ['all', 'Operations', 'Finance', 'Engineering', 'Human Resources', 'Safety', 'IT'];

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Repository</h1>
        <p className="mt-1 text-sm text-gray-600">
          Centralized institutional memory and best practices documentation
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search knowledge base..."
              />
            </div>
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Articles</p>
              <p className="text-xl font-bold text-gray-900">{knowledgeItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Tag className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-xl font-bold text-gray-900">{categories.length - 1}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-purple-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="text-xl font-bold text-gray-900">Today</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-xl font-bold text-gray-900">4.7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Knowledge Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-blue-600">{item.type}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.summary}</p>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    {renderStars(item.rating)}
                    <span className="text-sm text-gray-600 ml-1">({item.rating})</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.views} views
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-gray-500">
                  Last updated: {new Date(item.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-blue-900 mb-2">Contribute to Knowledge Base</h3>
        <p className="text-sm text-blue-700 mb-4">
          Share your expertise and help build institutional knowledge for future reference.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Create New Article
        </button>
      </div>
    </div>
  );
};

export default KnowledgeRepository;