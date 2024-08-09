import React, { createContext, useContext, useState, useEffect } from 'react';
import getStoriesByContentType from '@/lib/storyblok/helpers/getStoriesByContentType';  

const StoryblokContext = createContext();

export const StoryblokProvider = ({ children, stories, globalSettings }) => {
  const [contextStories, setContextStories] = useState(stories);
  const [contextGlobalSettings, setContextGlobalSettings] = useState(globalSettings);

  const getStoriesByContentTypeHandler = (contentType) => {
    return getStoriesByContentType(contextStories, contentType);
  };

  useEffect(() => {
    //console.log(stories)
  }, [stories]);

  return (
    <StoryblokContext.Provider value={{ 
      stories: contextStories, 
      globalSettings: contextGlobalSettings, 
      getStoriesByContentType: getStoriesByContentTypeHandler
    }}>
      {children}
    </StoryblokContext.Provider>
  );
};

export const useStoryblok = () => useContext(StoryblokContext);
