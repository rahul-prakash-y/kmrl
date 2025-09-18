import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { UserRole } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role.toString().toLocaleLowerCase())) {
    // If user does not have the required role, redirect to an unauthorized page or dashboard
    // For simplicity, we'll redirect to the dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  // If user is authenticated (and has the right role), render the child component
  return <Outlet />;
};

export default ProtectedRoute;
