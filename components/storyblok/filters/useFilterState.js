import { useState } from 'react';

const useFilterState = () => {
  // State to store filter data
  const [currentFilters, setCurrentFilters] = useState({});

  // Callback to handle filter state change
  const handleFilterStateChange = (filtersState) => {
    setCurrentFilters(filtersState);
  };

  return { currentFilters, handleFilterStateChange };
};

export default useFilterState;
