import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router';
import { useAuth } from '../hooks/useAuth';
import AppLayout from '../components/Layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';

// Page Imports
import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';
import DocumentUpload from '../components/pages/DocumentUpload';
import AISummaries from '../components/pages/AISummaries';
import SearchFilter from '../components/pages/SearchFilter';
import ComplianceTracker from '../components/pages/ComplianceTracker';
import KnowledgeRepository from '../components/pages/KnowledgeRepository';
import Collaboration from '../components/pages/Collaboration';
import UserManagement from '../components/pages/UserManagement';

const AppRouter: React.FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route: Login Page */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected Routes within the App Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<DocumentUpload />} />
            <Route path="/summaries" element={<AISummaries />} />
            <Route path="/search" element={<SearchFilter />} />
            <Route path="/compliance" element={<ComplianceTracker />} />
            <Route path="/knowledge" element={<KnowledgeRepository />} />
            <Route path="/collaboration" element={<Collaboration />} />
            
            {/* Admin-only Route */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/users" element={<UserManagement />} />
            </Route>

            {/* Default route for logged-in users */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
