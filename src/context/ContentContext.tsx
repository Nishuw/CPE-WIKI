import React, { createContext, useContext, useState, useEffect } from 'react';
import { Topic, Content } from '../types';
import { useAuth } from './AuthContext';

interface ContentContextType {
  topics: Topic[];
  contents: Content[];
  addTopic: (title: string, parentId: string | null) => void;
  updateTopic: (id: string, title: string) => void;
  deleteTopic: (id: string) => void;
  addContent: (topicId: string, title: string, body: string) => void;
  updateContent: (id: string, title: string, body: string) => void;
  deleteContent: (id: string) => void;
  getTopicById: (id: string) => Topic | undefined;
  getContentById: (id: string) => Content | undefined;
  getContentsByTopicId: (topicId: string) => Content[];
  getChildTopics: (parentId: string | null) => Topic[];
}

// Initial mock data
const initialTopics: Topic[] = [
  {
    id: '1',
    title: 'Clients',
    slug: 'clients',
    parentId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: '1',
  },
  {
    id: '2',
    title: 'Projects',
    slug: 'projects',
    parentId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: '1',
  },
  {
    id: '3',
    title: 'Client A',
    slug: 'client-a',
    parentId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: '1',
  },
];

const initialContents: Content[] = [
  {
    id: '1',
    topicId: '3',
    title: 'Client A Information',
    body: '<p>This is information about Client A.</p><p>They are a great client!</p>',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: '1',
  },
];

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    // Load from localStorage if available, otherwise use initial data
    const storedTopics = localStorage.getItem('topics');
    const storedContents = localStorage.getItem('contents');
    
    setTopics(storedTopics ? JSON.parse(storedTopics) : initialTopics);
    setContents(storedContents ? JSON.parse(storedContents) : initialContents);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (topics.length > 0) {
      localStorage.setItem('topics', JSON.stringify(topics));
    }
    if (contents.length > 0) {
      localStorage.setItem('contents', JSON.stringify(contents));
    }
  }, [topics, contents]);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const addTopic = (title: string, parentId: string | null) => {
    if (!user) return;
    
    const newTopic: Topic = {
      id: Date.now().toString(),
      title,
      slug: createSlug(title),
      parentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.id,
    };
    
    setTopics([...topics, newTopic]);
  };

  const updateTopic = (id: string, title: string) => {
    setTopics(
      topics.map(topic => 
        topic.id === id 
          ? { 
              ...topic, 
              title, 
              slug: createSlug(title), 
              updatedAt: new Date().toISOString() 
            } 
          : topic
      )
    );
  };

  const deleteTopic = (id: string) => {
    // Delete the topic and any child topics
    const childTopicIds = getChildTopics(id).map(topic => topic.id);
    const allTopicIdsToDelete = [id, ...childTopicIds];
    
    // Remove topics
    setTopics(topics.filter(topic => !allTopicIdsToDelete.includes(topic.id)));
    
    // Remove content associated with these topics
    setContents(contents.filter(content => !allTopicIdsToDelete.includes(content.topicId)));
  };

  const addContent = (topicId: string, title: string, body: string) => {
    if (!user) return;
    
    const newContent: Content = {
      id: Date.now().toString(),
      topicId,
      title,
      body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.id,
    };
    
    setContents([...contents, newContent]);
  };

  const updateContent = (id: string, title: string, body: string) => {
    setContents(
      contents.map(content => 
        content.id === id 
          ? { 
              ...content, 
              title, 
              body, 
              updatedAt: new Date().toISOString() 
            } 
          : content
      )
    );
  };

  const deleteContent = (id: string) => {
    setContents(contents.filter(content => content.id !== id));
  };

  const getTopicById = (id: string) => {
    return topics.find(topic => topic.id === id);
  };

  const getContentById = (id: string) => {
    return contents.find(content => content.id === id);
  };

  const getContentsByTopicId = (topicId: string) => {
    return contents.filter(content => content.topicId === topicId);
  };

  const getChildTopics = (parentId: string | null) => {
    return topics.filter(topic => topic.parentId === parentId);
  };

  return (
    <ContentContext.Provider value={{
      topics,
      contents,
      addTopic,
      updateTopic,
      deleteTopic,
      addContent,
      updateContent,
      deleteContent,
      getTopicById,
      getContentById,
      getContentsByTopicId,
      getChildTopics,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};