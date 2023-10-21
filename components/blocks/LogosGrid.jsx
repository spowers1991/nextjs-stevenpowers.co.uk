import React from 'react';
import { storyblokEditable } from "@storyblok/react";
import { useInView } from 'react-intersection-observer';
import Heading from "@/components/html_tags/Heading";
import Image from 'next/image';
import Button from "../html_tags/Button";

const LogosGrid = ({ blok }) => {

const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
});
    
  return ( 
      <div ref={ref} className={`mx-auto container my-16 md:my-24 px-6 xl:px-16 3xl:px-0 border-b pb-24 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>
        <Heading size={'h3'} className="mb-16 sm:mb-24">
            {blok.title}
        </Heading>
        <div className="max-w-7xl items-end grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-12 sm:gap-16 lg:gap-20 pb-16 sm:pb-16 md:pb-24">
            {blok?.logos?.map(( logo, index ) => (
                <div key={index} className={`${(index === 2) ? 'col-span-2' : 'col-span-1'} flex flex-col`}>          
                    <Image
                        src={logo.filename}
                        alt={logo.alt}
                        width={500}
                        height={500}
                        className="w-full object-cover !max-h-[800px]"
                        priority={true}
                    />
                    <Heading size="h4" className='!font-[400] mx-auto mt-3 text-xl sm:!text-2xl'>
                        {logo.alt}
                    </Heading>
                </div>
            ))}
        </div>
        <Button href={blok?.button_link?.cached_url} newTab={blok?.button_new_tab} color={blok.button_colour}>
            {blok?.button_label} 
        </Button>
      </div>
  );
};

export default LogosGrid;
