import React, { createContext, useContext, useState } from 'react';

// Helpers
import getStoriesByContentType from '@/lib/storyblok/stories/helpers/getStoriesByContentType';  
import getStoriesByIds from './helpers/getStoriesByIds';
import getStoriesTags from './helpers/getStoriesTags';

// Child Context Providers
import { FiltersProvider } from '@/lib/storyblok/filters/FiltersContext'

const StoriesContext = createContext();

export const StoriesProvider = ({ children, stories  }) => {
  const [savedStories] = useState(stories);

  const getStoriesByContentTypeHandler = (contentType) => {
    return getStoriesByContentType(savedStories, contentType);
  };

  const getStoriesByIdsHandler = (uuids) => {
    return getStoriesByIds(savedStories, uuids);
  };

  const getStoriesTagsHandler = (stories) => {
    return getStoriesTags(stories);
  };

  return (
    <StoriesContext.Provider value={{ 
      stories: savedStories, 
      getStoriesByContentType: getStoriesByContentTypeHandler,
      getStoriesByIds: getStoriesByIdsHandler,
      getStoriesTags: getStoriesTagsHandler,
    }}>
      <FiltersProvider value={{ 
        stories: stories,
      }}>
        {children}
      </FiltersProvider>
    </StoriesContext.Provider>
  );
};

export const useStories = () => useContext(StoriesContext);
