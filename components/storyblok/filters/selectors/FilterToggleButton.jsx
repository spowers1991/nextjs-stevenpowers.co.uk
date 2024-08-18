import React from 'react';

const FilterToggleButton = ({ toggleFilters }) => {
  return (
    <div onClick={toggleFilters} className='absolute w-[150px] h-[50px] bg-[#43a0ed] top-[-50px] right-0 left-0 l m-auto cursor-pointer'>
      <div className='flex h-full items-center text-white'>
        <svg className="m-auto"  fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 18h-2v5h-2v-5h-2v-3h6v3zm-2-17h-2v12h2v-12zm11 7h-6v3h2v12h2v-12h2v-3zm-2-7h-2v5h2v-5zm11 14h-6v3h2v5h2v-5h2v-3zm-2-14h-2v12h2v-12z"/></svg>
      </div>
    </div>
  );
};

export default FilterToggleButton;
