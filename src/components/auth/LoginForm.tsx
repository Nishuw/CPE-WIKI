import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { LockIcon, UserIcon } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
        <p className="mt-2 text-gray-600">Enter your credentials to access your account</p>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        
        <Input
          id="username"
          label="Username"
          type="text"
          required
          placeholder="admin or user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="pl-10"
          icon={<UserIcon className="w-5 h-5 text-gray-400" />}
        />
        
        <Input
          id="password"
          label="Password"
          type="password"
          required
          placeholder="admin or user"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pl-10"
          icon={<LockIcon className="w-5 h-5 text-gray-400" />}
        />
        
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          Sign in
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Demo credentials:</p>
        <p>Username: admin, Password: admin</p>
        <p>Username: user, Password: user</p>
      </div>
    </div>
  );
};

export default LoginForm;