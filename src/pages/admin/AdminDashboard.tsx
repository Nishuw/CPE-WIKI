import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { 
  FolderIcon, 
  FileTextIcon, 
  UsersIcon,
  PlusIcon,
  UserCogIcon
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { topics, contents } = useContent();
  const { user } = useAuth();
  
  // Simple statistics
  const topicCount = topics.length;
  const contentCount = contents.length;
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.username}! Manage your content platform here.
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FolderIcon size={24} className="text-blue-900" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{topicCount}</p>
              <p className="text-gray-600">Topics</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-teal-100 p-3 rounded-full mr-4">
              <FileTextIcon size={24} className="text-teal-700" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{contentCount}</p>
              <p className="text-gray-600">Content items</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-gray-100 p-3 rounded-full mr-4">
              <UsersIcon size={24} className="text-gray-700" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">2</p>
              <p className="text-gray-600">Users</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/admin/topics">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full justify-start"
              icon={<FolderIcon size={18} />}
            >
              Manage Topics
            </Button>
          </Link>
          
          <Link to="/admin/topics/new">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full justify-start"
              icon={<PlusIcon size={18} />}
            >
              Create New Topic
            </Button>
          </Link>

          <Link to="/admin/users">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full justify-start"
              icon={<UserCogIcon size={18} />}
            >
              Manage Users
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Recent activity - simplified for this demo */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {contents.slice(0, 5).map(content => (
            <div key={content.id} className="flex items-start border-b border-gray-100 pb-4 last:border-0">
              <FileTextIcon size={18} className="text-blue-900 mr-3 mt-1" />
              <div>
                <p className="font-medium text-gray-900">{content.title}</p>
                <p className="text-sm text-gray-500">
                  Updated {new Date(content.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          
          {contents.length === 0 && (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;