import React, { createContext, useContext, useState, useEffect } from 'react';
import getStoriesByContentType from '@/lib/storyblok/helpers/getStoriesByContentType';  
import getStoriesByIds from './helpers/getStoriesByIds';
import getStoriesTags from './helpers/getStoriesTags';

const StoryblokContext = createContext();

export const StoryblokProvider = ({ children, stories, globalSettings }) => {
  const [contextStories] = useState(stories);
  const [contextGlobalSettings] = useState(globalSettings);
  const [paginatedStories, setPaginatedStories] = useState();
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);

  const getStoriesByContentTypeHandler = (contentType) => {
    return getStoriesByContentType(contextStories, contentType);
  };

  const getStoriesByIdsHandler = (uuids) => {
    return getStoriesByIds(contextStories, uuids);
  };

  const getStoriesTagsHandler = (stories) => {
    return getStoriesTags(stories);
  };

  // Log paginatedStories whenever it changes
  useEffect(() => {
    //console.log(paginatedStories, currentPaginationIndex);
  }, [paginatedStories]);

  return (
    <StoryblokContext.Provider value={{ 
      stories: contextStories, 
      globalSettings: contextGlobalSettings,
      getStoriesByContentType: getStoriesByContentTypeHandler,
      getStoriesByIds: getStoriesByIdsHandler,
      getStoriesTags: getStoriesTagsHandler,
      paginatedStories: paginatedStories,
      setPaginatedStories: setPaginatedStories,
      currentPaginationIndex: currentPaginationIndex,
      setCurrentPaginationIndex: setCurrentPaginationIndex,
    }}>
      {children}
    </StoryblokContext.Provider>
  );
};

export const useStoryblok = () => useContext(StoryblokContext);
