import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple protected route handler (checks simulated auth session)
export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('taskAuthToken') !== null || true; // Default true for stand-alone Task Manager

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
