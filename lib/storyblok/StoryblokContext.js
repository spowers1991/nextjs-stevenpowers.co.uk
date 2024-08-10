import React, { createContext, useContext, useState } from 'react';
import getStoriesByContentType from '@/lib/storyblok/helpers/getStoriesByContentType';  
import getStoriesByIds from './helpers/getStoriesByIds';
import getStoriesTags from './helpers/getStoriesTags';

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

  const getStoriesTagsHandler = (stories) => {
    return getStoriesTags(stories);
  };

  return (
    <StoryblokContext.Provider value={{ 
      stories: contextStories, 
      globalSettings: contextGlobalSettings,
      getStoriesByContentType: getStoriesByContentTypeHandler,
      getStoriesByIds: getStoriesByIdsHandler,
      getStoriesTags: getStoriesTagsHandler,
    }}>
      {children}
    </StoryblokContext.Provider>
  );
};

export const useStoryblok = () => useContext(StoryblokContext);
