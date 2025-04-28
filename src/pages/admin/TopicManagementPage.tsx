import React, { useState } from 'react';
import TopicList from '../../components/admin/TopicList';
import TopicForm from '../../components/admin/TopicForm';

const TopicManagementPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTopicId, setEditingTopicId] = useState<string | undefined>(undefined);
  const [parentTopicId, setParentTopicId] = useState<string | null>(null);
  
  const handleAddClick = (parentId: string | null) => {
    setParentTopicId(parentId);
    setEditingTopicId(undefined);
    setShowForm(true);
  };
  
  const handleEditClick = (topicId: string) => {
    setEditingTopicId(topicId);
    setParentTopicId(null);
    setShowForm(true);
  };
  
  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingTopicId(undefined);
    setParentTopicId(null);
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Topic Management</h1>
        <p className="text-gray-600 mt-2">
          Create, edit, and organize topics to structure your content.
        </p>
      </div>
      
      {showForm ? (
        <div className="mb-8">
          <TopicForm 
            topicId={editingTopicId}
            parentId={parentTopicId}
            onSuccess={handleFormSuccess}
          />
          <div className="mt-4">
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              Cancel and return to topic list
            </button>
          </div>
        </div>
      ) : (
        <TopicList 
          onAddTopic={handleAddClick}
          onEditTopic={handleEditClick}
        />
      )}
    </div>
  );
};

export default TopicManagementPage;