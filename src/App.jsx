import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useFeedback } from './data/FeedbackContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy-loaded Pages for code-splitting
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const SubmitFeedback = lazy(() => import('./pages/SubmitFeedback'));
const ViewFeedbackResults = lazy(() => import('./pages/ViewFeedbackResults'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const CreateFeedbackForm = lazy(() => import('./pages/CreateFeedbackForm'));
const ViewFeedback = lazy(() => import('./pages/ViewFeedback'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));

function AppLayout() {
  const { userRole } = useFeedback();

  const routes = (
    <ErrorBoundary>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/forms"
        element={
          <ProtectedRoute requiredRole="student">
            <SubmitFeedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/results"
        element={
          <ProtectedRoute requiredRole="student">
            <ViewFeedbackResults />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create-form"
        element={
          <ProtectedRoute requiredRole="admin">
            <CreateFeedbackForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/feedback"
        element={
          <ProtectedRoute requiredRole="admin">
            <ViewFeedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminAnalytics />
          </ProtectedRoute>
        }
      />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );

  // Home and Login pages don't use Layout
  if (!userRole) {
    return routes;
  }

  // Dashboard pages use Layout
  return <Layout>{routes}</Layout>;
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
