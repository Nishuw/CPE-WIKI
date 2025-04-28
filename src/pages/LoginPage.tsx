import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-teal-800 flex justify-center items-center p-4">
      <LoginForm />
    </div>
  );
};

export default LoginPage;