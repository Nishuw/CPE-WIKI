import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { Topic } from '../../types';
import { ChevronRightIcon, FolderIcon, SearchIcon } from 'lucide-react';

interface SidebarProps {
  currentTopicId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTopicId }) => {
  const { topics, getChildTopics } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const rootTopics = getChildTopics(null);
  
  const filterTopics = (topics: Topic[], term: string): Topic[] => {
    return topics.filter(topic => 
      topic.title.toLowerCase().includes(term.toLowerCase())
    );
  };
  
  const renderTopics = (parentTopics: Topic[]) => {
    const filteredTopics = searchTerm ? filterTopics(parentTopics, searchTerm) : parentTopics;
    
    return (
      <ul className="space-y-1">
        {filteredTopics.map((topic) => {
          const children = getChildTopics(topic.id);
          const isActive = topic.id === currentTopicId;
          const hasChildren = children.length > 0;
          
          return (
            <li key={topic.id}>
              <Link
                to={`/topics/${topic.id}`}
                className={`
                  flex items-center px-4 py-2 text-sm rounded-md transition-colors
                  ${isActive 
                    ? 'bg-blue-100 text-blue-900 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <FolderIcon size={18} className="mr-2 text-blue-800" />
                <span>{topic.title}</span>
                {hasChildren && (
                  <ChevronRightIcon size={16} className="ml-auto" />
                )}
              </Link>
              
              {hasChildren && !searchTerm && (
                <div className="ml-4 pl-2 border-l border-gray-200">
                  {renderTopics(children)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };
  
  return (
    <aside className="w-72 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h2>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <SearchIcon 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {rootTopics.length > 0 ? (
          renderTopics(rootTopics)
        ) : (
          <p className="text-sm text-gray-500">No topics available</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;