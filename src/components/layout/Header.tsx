import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { LogOutIcon } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">ContentHub</Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                icon={<LogOutIcon size={16} />}
                className="text-white hover:bg-blue-800"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-full hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header