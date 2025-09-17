export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export type UserRole = 
  | 'admin'
  | 'station_controller' 
  | 'engineer'
  | 'procurement_officer'
  | 'hr_officer'
  | 'finance_officer'
  | 'executive_director';

export interface Document {
  id: string;
  title: string;
  type: string;
  department: string;
  uploadedBy: string;
  uploadedAt: string;
  fileSize: string;
  language: 'english' | 'malayalam' | 'both';
  status: 'processing' | 'ready' | 'failed';
  tags: string[];
  summary?: string;
  originalUrl?: string;
  complianceType?: string;
  deadline?: string;
}

export interface Alert {
  id: string;
  type: 'compliance' | 'deadline' | 'new_document' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  isRead: boolean;
  department?: string;
}

export interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignedTo: string;
  department: string;
  documentId?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface Comment {
  id: string;
  documentId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  createdAt: string;
  isEdited: boolean;
}