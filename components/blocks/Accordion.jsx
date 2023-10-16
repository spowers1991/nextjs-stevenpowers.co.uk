import React, { useState } from 'react';
import { storyblokEditable } from "@storyblok/react";
import Heading from "../../utils/Heading";
import RichText from "../../utils/RichText";
import { useInView } from 'react-intersection-observer';

const Accordion = ({ blok }) => {
  const [openTabs, setOpenTabs] = useState(Array(blok.accordion.length).fill(false));

  const toggleAccordion = (index) => {
    const newOpenTabs = [...openTabs];
    newOpenTabs[index] = !newOpenTabs[index];
    setOpenTabs(newOpenTabs);
  };

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className={`container mx-auto px-6 xl:px-12 3xl:px-6 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 py-16 md:py-24 border-b duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>
      <div>
        <Heading size="h3" className={`text-3xl sm:text-4xl md:text-5xl font-bold z-20 order-first ${blok.row_reverse ? 'md:order-last md:text-right' : 'md:order-first md:text-left'} text-left `}>
            {blok.title}
        </Heading>
      </div>
      <div className={`accordion flex flex-col items-start`}>
        {blok.accordion.map((tab, index) => (
          <div className='w-full' key={index}>
            <button
              className="group hover:text-[#434bed] flex w-full text-2xl md:text-3xl items-center text-left py-[1.25rem]"
              onClick={() => toggleAccordion(index)}
            >
              <h4 className={`max-w-[350px] md:max-w-none ${openTabs[index] ? 'text-[#434bed]' : ''}`}>
                {tab.title}
              </h4>
              <div className="relative ml-auto w-4 md:w-5">
                <span className={`absolute w-4 md:w-5 h-[2px] bg-black group-hover:bg-[#434bed] duration-150 transition-transform ${openTabs[index] ? 'rotate-0' : 'rotate-90'}`}></span>
                <span className={`absolute w-4 md:w-5 h-[2px] bg-black group-hover:bg-[#434bed] duration-150 ${openTabs[index] ? '!bg-[#434bed]' : ''}`}></span>
              </div>
            </button>
            <div className={`panel ${openTabs[index] ? 'max-h-24' : 'max-h-0'} overflow-hidden duration-500 border-b w-full`}>
              <div className="pb-5 max-w-[350px] md:max-w-[85%] ml-1">
                <RichText content={tab.content} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
