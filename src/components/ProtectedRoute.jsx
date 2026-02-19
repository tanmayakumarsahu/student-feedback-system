import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFeedback } from '../data/FeedbackContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, userRole } = useFeedback();

  if (!currentUser || !userRole) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
