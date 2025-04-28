import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import Button from '../ui/Button';
import { PlusIcon, EditIcon, TrashIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

interface TopicListProps {
  onAddTopic?: (parentId: string | null) => void;
  onEditTopic?: (topicId: string) => void;
}

const TopicList: React.FC<TopicListProps> = ({ onAddTopic, onEditTopic }) => {
  const { topics, getChildTopics, deleteTopic } = useContent();
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  
  const rootTopics = getChildTopics(null);
  
  const toggleExpand = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };
  
  const handleDeleteTopic = (topicId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this topic? This will delete all content within this topic and cannot be undone.')) {
      deleteTopic(topicId);
    }
  };
  
  const renderTopicItem = (topic: any, level: number = 0) => {
    const children = getChildTopics(topic.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedTopics.includes(topic.id);
    
    return (
      <React.Fragment key={topic.id}>
        <tr className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <div 
              className="flex items-center"
              style={{ paddingLeft: `${level * 1.5}rem` }}
            >
              {hasChildren && (
                <button 
                  onClick={() => toggleExpand(topic.id)}
                  className="mr-2 text-gray-500 hover:text-gray-800"
                >
                  {isExpanded ? (
                    <ChevronDownIcon size={18} />
                  ) : (
                    <ChevronRightIcon size={18} />
                  )}
                </button>
              )}
              <Link to={`/admin/topics/${topic.id}`} className="text-blue-900 hover:underline">
                {topic.title}
              </Link>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-end space-x-2">
              <Button 
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  if (onEditTopic) onEditTopic(topic.id);
                }}
                icon={<EditIcon size={16} />}
              >
                Edit
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                onClick={(e) => handleDeleteTopic(topic.id, e)}
                icon={<TrashIcon size={16} />}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </Button>
              {onAddTopic && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    onAddTopic(topic.id);
                  }}
                  icon={<PlusIcon size={16} />}
                >
                  Add Subtopic
                </Button>
              )}
            </div>
          </td>
        </tr>
        
        {isExpanded && hasChildren && (
          children.map(child => renderTopicItem(child, level + 1))
        )}
      </React.Fragment>
    );
  };
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Topics
        </h3>
        {onAddTopic && (
          <Button 
            variant="primary"
            onClick={() => onAddTopic(null)}
            icon={<PlusIcon size={16} />}
          >
            Add Root Topic
          </Button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Topic Name
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rootTopics.length > 0 ? (
              rootTopics.map(topic => renderTopicItem(topic))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                  No topics available. Create your first topic to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicList;