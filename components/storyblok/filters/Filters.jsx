import React, { useState, useEffect, useRef } from "react";
import { updateFilters } from "./actions/updateFilters";
import FilterToggleButton from "./selectors/FilterToggleButton";
import Searchbar from "./selectors/Searchbar";
import Checkbox from "./selectors/Checkbox";
import Pagination from './selectors/Pagination';
import FilteredStories from "./FilteredStories";

const Filters = ({ storiesToFilter, showPagination, showOptions, onFilterStateChange }) => {

  // Current filtered stories
  const [filteredStories, setFilteredStories] = useState(storiesToFilter);

  // Currently set filter options
  const [filtersOptions, setFiltersOptions] = useState({
    name: undefined,
    tag_list: [],
  });
  
  // Filter panel Open/Close state
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef(null);
  const [bottomPosition, setBottomPosition] = useState();

  // Pagination page state
  const [currentPage, setCurrentPage] = useState(1); 

  // Panel Logic 
  const toggleFilters = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Set the panels bottom position dynamically based on current height
  useEffect(() => {
    if (componentRef.current) {
      const panelHeight = componentRef.current.offsetHeight;
      const newBottomPosition = isOpen ? 0 : -panelHeight; 
      setBottomPosition(newBottomPosition);
    }
  }, [isOpen]);

  // ~
  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsOpen(false); 
    }
  };

  // ~
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter handling logic (comparing and updating)
  const filtersHandler = (selectedOptions, propertyToSearch) => {
    setFiltersOptions((prevFilters) => ({
      ...prevFilters,
      [propertyToSearch]: selectedOptions,
    }));
  };
  // ~
  useEffect(() => {
    updateFilters(storiesToFilter, filtersOptions, setFilteredStories);
    setCurrentPage(1); // Reset to page 1 when filters change
    
    // Invoke the callback to pass filters information to other components (OPTIONAL)
    if (onFilterStateChange) {
      onFilterStateChange(filtersOptions);
    }

  }, [filtersOptions, storiesToFilter]);

  return (
    <>
      <div>
        {(showOptions != false) &&
          <div ref={componentRef} className={`fixed w-full z-30 left-0 bg-white p-6 duration-150`} style={{bottom: `${bottomPosition}px`}}>
            <div className="mt-6 flex flex-col gap-6">
              <FilterToggleButton 
                toggleFilters={toggleFilters} 
              />
              <Searchbar   
                label={"Title"}
                propertyToSearch={"name"}
                filtersHandler={filtersHandler}
              />
              <Checkbox 
                storiesToFilter={storiesToFilter}
                label={"Tags"}
                propertyToSearch={"tag_list"}
                filtersHandler={filtersHandler}
              />
            </div>
          </div>
        }
        
        <FilteredStories stories={filteredStories} page={currentPage} />

        {(showPagination != false) &&
            (filteredStories.length > 3) &&
              <Pagination 
                storiesToFilter={filteredStories} 
                storiesPerPage={6} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
              />
        }
       
      </div>
    </>
  );
};

export default Filters;
