import React, { useState, useEffect, useRef } from "react";
import { updateFilters } from "./actions/updateFilters";
import FilterToggleButton from "./selectors/FilterToggleButton";
import Searchbar from "./selectors/Searchbar";
import Checkbox from "./selectors/Checkbox";
import Pagination from './selectors/Pagination';
import FilteredStories from "./FilteredStories";

const Filters = ({ storiesToFilter, showPagination, showOptions }) => {

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

  // Pagination page state
  const [currentPage, setCurrentPage] = useState(1); 

  // Panel Logic 
  const toggleFilters = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // ~
  const handleClickOutside = (event) => {
    if (componentRef.current && !componentRef.current.contains(event.target)) {
      setIsOpen(false); // Close the component
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
  }, [filtersOptions, storiesToFilter]);

  return (
    <>
      <div>
        {(showOptions != false) &&
          <div ref={componentRef} className={`fixed ${isOpen ? 'bottom-[-50px]' : 'bottom-[-350px]'} w-full z-30 left-0 my-12 bg-white p-6 duration-150`}>
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
