import React, { useState } from 'react';

const Searchbar = ({ label, propertyToSearch, filtersHandler }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filtersHandler(query, propertyToSearch);
  };

  const clearSearch = () => {
    setSearchQuery('');
    filtersHandler('', propertyToSearch); // Clear the search filter
  };

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-bold uppercase text-[11px] sm:text-xs tracking-[1px]'>
        {label}
      </h3>
      <div className='flex items-center border-2 border-solid focus-within:border-[#434bed] hover:border-[#434bed] border-[#434bed]'>
        <input
          className='block w-full p-2 focus:outline-none placeholder-shown:border-[#434bed]'
          type='text'
          placeholder='Title of the project...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className='bg-[#434bed] text-white h-[37.5px] sm:h-[40px] b-[10px] sm:pb-[11px] flex items-center gap-x-3 duration-150 py-[11px] sm:py-[12px] px-5 uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]'
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
