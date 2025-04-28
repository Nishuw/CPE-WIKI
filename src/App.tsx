import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import TopicPage from './pages/TopicPage';
import ContentViewPage from './pages/ContentViewPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import TopicManagementPage from './pages/admin/TopicManagementPage';
import TopicDetailPage from './pages/admin/TopicDetailPage';
import ContentEditPage from './pages/admin/ContentEditPage';
import NewTopicPage from './pages/admin/NewTopicPage';
import UserManagementPage from './pages/admin/UserManagementPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Admin Route Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Public Routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="topics/:topicId" element={<TopicPage />} />
              <Route path="topics/:topicId/content/:contentId" element={<ContentViewPage />} />
            </Route>
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <Layout showSidebar={false} />
                  </AdminRoute>
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="topics" element={<TopicManagementPage />} />
              <Route path="topics/new" element={<NewTopicPage />} />
              <Route path="topics/:topicId" element={<TopicDetailPage />} />
              <Route path="topics/:topicId/content/:contentId/edit" element={<ContentEditPage />} />
              <Route path="users" element={<UserManagementPage />} />
            </Route>
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;