import React, { createContext, useContext, useState, useEffect } from 'react';

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filteredStories, setFilteredStories] = useState();

  useEffect(() => {
      //console.log(filteredStories);
  }, [filteredStories]);

  return (
    <FiltersContext.Provider value={{ 
      filteredStories, 
      setFilteredStories,
    }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
