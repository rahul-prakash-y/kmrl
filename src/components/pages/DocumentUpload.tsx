
import React, { useState } from 'react';
import { Send, Tag, Globe, Building } from 'lucide-react';
import FileUpload from '../Upload/FileUpload';
import apiClient from '../../api/apiClient';

const DocumentUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    department: '',
    language: 'English', // Match schema values
    tags: '',
  });
  console.log("uploadForm",uploadForm);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }

    // Use FormData to send file and text data together
    const formData = new FormData();
    formData.append('document', files[0]); // 'document' must match the backend multer field name
    formData.append('title', uploadForm.title);
    formData.append('department', uploadForm.department);
    formData.append('language', uploadForm.language);
    formData.append('tags', uploadForm.tags);

    try {
      const response = await apiClient.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert('File uploaded successfully!');
        // Reset form
        setFiles([]);
        setUploadForm({ title: '', department: '', language: 'English', tags: '' });
      }
    } catch (error) {
      console.error('File upload failed:', error);
      alert('File upload failed. Please try again.');
    }
  };

  const departments = [
    'Operations',
    'Engineering',
    'Finance',
    'Human Resources',
    'IT',
    'Procurement',
    'Safety'
  ];

  const documentTypes = [
    'Policy Document',
    'Technical Manual',
    'Financial Report',
    'Safety Protocol',
    'Compliance Document',
    'Training Material',
    'Other'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
        <p className="mt-1 text-sm text-gray-600">
          Upload documents for AI processing and multilingual summarization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Files</h2>
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Metadata Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Document Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Title *
              </label>
              <input
                type="text"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter document title"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="inline h-4 w-4 mr-1" />
                  Department
                </label>
                <select
                  value={uploadForm.department}
                  onChange={(e) => setUploadForm({...uploadForm, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm({...uploadForm, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Type</option>
                  {documentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="inline h-4 w-4 mr-1" />
                Primary Language
              </label>
              <div className="flex space-x-4">
                {[
                  { value: 'english', label: 'English' },
                  { value: 'malayalam', label: 'Malayalam' },
                  { value: 'mixed', label: 'Both' }
                ].map(lang => (
                  <label key={lang.value} className="flex items-center">
                    <input
                      type="radio"
                      name="language"
                      value={lang.value}
                      checked={uploadForm.language === lang.value}
                      onChange={(e) => setUploadForm({...uploadForm, language: e.target.value})}
                      className="mr-2"
                    />
                    {lang.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Tags
              </label>
              <input
                type="text"
                value={uploadForm.tags}
                onChange={(e) => setUploadForm({...uploadForm, tags: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter tags separated by commas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Optional description"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Send className="h-4 w-4 mr-2" />
              Process Document
            </button>
          </form>
        </div>
      </div>

      {/* Processing Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 mb-2">AI Processing Pipeline</h3>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-blue-800">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Document ingestion and format detection
          </div>
          <div className="flex items-center text-sm text-blue-800">
            <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
            Multilingual text extraction and OCR
          </div>
          <div className="flex items-center text-sm text-blue-800">
            <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
            AI-powered summarization and keyword extraction
          </div>
          <div className="flex items-center text-sm text-blue-800">
            <div className="w-2 h-2 bg-blue-300 rounded-full mr-2"></div>
            Compliance and regulatory analysis
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
