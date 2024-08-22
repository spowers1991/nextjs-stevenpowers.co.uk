import React, { useState } from 'react';
import { extractPropertiesNames } from '../helpers/extractPropertiesNames';

const Checkbox = ({ storiesToFilter, label, propertyToSearch, filtersHandler }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    const updatedOptions = isChecked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);

    setSelectedOptions(updatedOptions);

    filtersHandler(updatedOptions, propertyToSearch);
  };

  // Get a list of the options from the property names
  const options = extractPropertiesNames(storiesToFilter, propertyToSearch);

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-bold uppercase text-[11px] sm:text-xs tracking-[1px]'>
        {label}
      </h3>
      <div className='grid grid-cols-2 w-fit gap-x-6 gap-y-3'>
        {options.map((option, index) => (
        <label key={index} className='col-span-1 flex flex-row gap-x-1 items-center cursor-pointer '>
          <input
            className='sr-only peer'
            type='checkbox'
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={handleCheckboxChange}
          />
          <div className='w-6 h-6 bg-gray-200 border-white border-2 peer-checked:bg-[#434bed] peer-checked:content-[""] peer-checked:after:content-[""] peer-checked:after:block peer-checked:after:absolute peer-checked:after:w-4 peer-checked:after:h-2 peer-checked:after:border-b-2 peer-checked:after:rotate-45 peer-checked:after:left-1 peer-checked:after:top-2 '></div>
          <span className="ml-1 text-gray-700 peer-checked:text-[#333] py-[11px] sm:py-[12px] uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]">
            {option}
          </span>
        </label>        
        ))}
      </div>
    </div>
  );
};

export default Checkbox;
