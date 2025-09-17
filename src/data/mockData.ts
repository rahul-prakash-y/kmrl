import { User, Document, Alert, ComplianceItem, Comment } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@kmrl.co.in',
    role: 'admin',
    department: 'IT',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Priya Nair',
    email: 'priya.nair@kmrl.co.in',
    role: 'station_controller',
    department: 'Operations',
    isActive: true,
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    name: 'Mohammed Rashid',
    email: 'm.rashid@kmrl.co.in',
    role: 'engineer',
    department: 'Engineering',
    isActive: true,
    createdAt: '2024-01-03'
  },
  {
    id: '4',
    name: 'Lakshmi Menon',
    email: 'lakshmi.menon@kmrl.co.in',
    role: 'hr_officer',
    department: 'Human Resources',
    isActive: true,
    createdAt: '2024-01-04'
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Safety Protocol Updates - Malayalam Version',
    type: 'Policy Document',
    department: 'Operations',
    uploadedBy: 'Priya Nair',
    uploadedAt: '2024-12-20',
    fileSize: '2.5 MB',
    language: 'malayalam',
    status: 'ready',
    tags: ['safety', 'protocol', 'malayalam'],
    summary: 'Updated safety protocols for station operations including emergency procedures and daily safety checks.',
    complianceType: 'Safety Compliance',
    deadline: '2024-12-31'
  },
  {
    id: '2',
    title: 'Annual Budget Report 2024',
    type: 'Financial Report',
    department: 'Finance',
    uploadedBy: 'Finance Team',
    uploadedAt: '2024-12-19',
    fileSize: '5.2 MB',
    language: 'english',
    status: 'ready',
    tags: ['budget', 'finance', '2024'],
    summary: 'Comprehensive annual budget analysis showing expenditure patterns and projected costs for metro operations.'
  },
  {
    id: '3',
    title: 'Track Maintenance Guidelines',
    type: 'Technical Manual',
    department: 'Engineering',
    uploadedBy: 'Mohammed Rashid',
    uploadedAt: '2024-12-18',
    fileSize: '8.1 MB',
    language: 'both',
    status: 'processing',
    tags: ['maintenance', 'technical', 'tracks']
  }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'compliance',
    title: 'Safety Compliance Deadline Approaching',
    message: 'Safety protocol documentation due in 3 days',
    priority: 'high',
    createdAt: '2024-12-20',
    isRead: false,
    department: 'Operations'
  },
  {
    id: '2',
    type: 'new_document',
    title: 'New Budget Report Available',
    message: 'Annual Budget Report 2024 has been processed and is ready for review',
    priority: 'medium',
    createdAt: '2024-12-19',
    isRead: false,
    department: 'Finance'
  },
  {
    id: '3',
    type: 'deadline',
    title: 'Maintenance Schedule Update Required',
    message: 'Monthly maintenance schedule needs approval by December 25th',
    priority: 'medium',
    createdAt: '2024-12-18',
    isRead: true,
    department: 'Engineering'
  }
];

export const mockCompliance: ComplianceItem[] = [
  {
    id: '1',
    title: 'Safety Protocol Implementation',
    description: 'Implement updated safety protocols across all stations',
    deadline: '2024-12-31',
    status: 'in_progress',
    assignedTo: 'Priya Nair',
    department: 'Operations',
    documentId: '1',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Annual Financial Audit Preparation',
    description: 'Prepare documentation for annual financial audit',
    deadline: '2025-01-15',
    status: 'pending',
    assignedTo: 'Finance Team',
    department: 'Finance',
    priority: 'critical'
  },
  {
    id: '3',
    title: 'Track Safety Inspection',
    description: 'Complete quarterly track safety inspection documentation',
    deadline: '2024-12-28',
    status: 'completed',
    assignedTo: 'Mohammed Rashid',
    department: 'Engineering',
    priority: 'medium'
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    documentId: '1',
    userId: '2',
    userName: 'Priya Nair',
    userRole: 'station_controller',
    content: 'The Malayalam translation needs review in section 3.2 regarding emergency procedures.',
    createdAt: '2024-12-20T10:30:00Z',
    isEdited: false
  },
  {
    id: '2',
    documentId: '1',
    userId: '3',
    userName: 'Mohammed Rashid',
    userRole: 'engineer',
    content: 'I can help with the technical terminology review. The safety equipment specifications section looks good.',
    createdAt: '2024-12-20T14:15:00Z',
    isEdited: false
  }
];