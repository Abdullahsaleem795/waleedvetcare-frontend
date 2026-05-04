import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const { admin } = useAuth();
  const location  = useLocation();
  if (!admin) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return children;
};

export const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;