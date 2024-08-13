import React, { useState, useEffect } from 'react';
import { useFilters } from '@/lib/storyblok/filters/FiltersContext';
import { calculateTotalPages, getPaginatedItems } from '@/lib/storyblok/filters/helpers/getStoriesPagination';

function Pagination({ stories, storiesPerPage }) {
  // Pagination Instance State
  const totalPages = calculateTotalPages(stories?.length, storiesPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter stories for the current Pagination Segment
  const { setFilteredStories } = useFilters();
  useEffect(() => {
    setFilteredStories(getPaginatedItems(stories, currentPage, storiesPerPage));
  }, [currentPage]);

  // Pagination change event
  const handlePaginationChange = (index) => {
    if (index >= 1 && index <= totalPages) {
      setCurrentPage(index);
    }
  };

  // Reset page to 0 when unmounting component
  useEffect(() => {
    setCurrentPage(1)
  }, []);

  return (
    <div className="container mx-auto flex mt-12 md:mt-24 shadow-2xl w-fit">
      <div className="flex text-[#fff]">
        <div
          className={`flex flex-wrap items-center ${currentPage === 1 ? 'bg-[#ED434B] pointer-events-none' : 'bg-[#434bed] pointer-events-all'} py-[11px] sm:py-[12px] px-5 swiper-prev-stories-pagination cursor-pointer duration-150`}
          onClick={() => handlePaginationChange(currentPage - 1)}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z" />
          </svg>
        </div>
        <div className="container mx-auto flex">
          <div className="flex text-[#fff] ml-auto">
            <div className={`flex items-center bg-[#434bed]  cursor-pointer duration-150`}>
              {Array.from({ length: totalPages }, (_, index) => (
                <span key={index + 1} className={`py-[11px] sm:py-[12px] px-6 cursor-pointer duration-150 ${currentPage === index + 1 ? 'bg-[#43ed90]' : 'bg-[#434bed] '} `} onClick={() => handlePaginationChange(index + 1)}>
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`flex items-center ${currentPage === totalPages ? 'bg-[#ED434B] pointer-events-none' : 'bg-[#434bed] pointer-events-all'} py-[11px] sm:py-[12px] px-5 swiper-next-stories-pagination cursor-pointer duration-150`}
          onClick={() => handlePaginationChange(currentPage + 1)}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Pagination;