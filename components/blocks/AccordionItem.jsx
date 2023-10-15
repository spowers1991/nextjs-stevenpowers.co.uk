import React, { useState } from 'react';

const AccordionItem = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        className="group hover:text-[#434bed] flex w-full text-2xl md:text-3xl items-center text-left py-[1.25rem]"
        onClick={toggleAccordion}
      >
        <h3 className={`max-w-[350px] md:max-w-none ${open ? 'text-[#434bed]' : ''}`}>
          {title}
        </h3>
        <div className="relative ml-auto w-4 md:w-5">
          <span className={`absolute w-4 md:w-5 h-[2px] bg-black group-hover:bg-[#434bed] duration-300 transition-transform ${open ? 'rotate-0' : 'rotate-90'}`}></span>
          <span className={`absolute w-4 md:w-5 h-[2px] bg-black group-hover:bg-[#434bed] duration-300 ${open ? 'bg-[#434bed]' : ''}`}></span>
        </div>
      </button>
      <div className={`panel ${open ? 'max-h-96' : 'max-h-0'} overflow-hidden duration-300 border-b w-full`}>
        <div className="pb-5 max-w-[350px] md:max-w-[85%] ml-1">
          {content}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
