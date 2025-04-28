import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  showSidebar?: boolean;
  currentTopicId?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  showSidebar = true,
  currentTopicId
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar currentTopicId={currentTopicId} />
        )}
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;