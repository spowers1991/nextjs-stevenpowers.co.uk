import React, { createContext, useContext, useState } from 'react';
import getStoriesByContentType from '@/lib/storyblok/helpers/getStoriesByContentType';  
import getStoriesByIds from './helpers/getStoriesByIds';

const StoryblokContext = createContext();

export const StoryblokProvider = ({ children, stories, globalSettings }) => {
  const [contextStories] = useState(stories);
  const [contextGlobalSettings] = useState(globalSettings);

  const getStoriesByContentTypeHandler = (contentType) => {
    return getStoriesByContentType(contextStories, contentType);
  };

  const getStoriesByIdsHandler = (uuids) => {
    return getStoriesByIds(contextStories, uuids);
  };

  return (
    <StoryblokContext.Provider value={{ 
      stories: contextStories, 
      globalSettings: contextGlobalSettings,
      getStoriesByContentType: getStoriesByContentTypeHandler,
      getStoriesByIds: getStoriesByIdsHandler,
    }}>
      {children}
    </StoryblokContext.Provider>
  );
};

export const useStoryblok = () => useContext(StoryblokContext);
