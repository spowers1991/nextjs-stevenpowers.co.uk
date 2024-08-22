import React from 'react';
import Meta from "@/components/seo/Meta";
import { useInView } from 'react-intersection-observer';
import Heading from '@/components/html_tags/Heading';
import Filters from '@/components/storyblok/filters/Filters';
import Card from '@/components/storyblok/filters/Card';

// Context  
import { useStories } from '@/lib/storyblok/stories/StoriesContext';

// Utils
import { getPageName } from '@/utils/getPageName'

// Filters Component Local State
import useFilterState from '@/components/storyblok/filters/useFilterState';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.015,
  });

  const pageName = getPageName();

  const { getStoriesByContentType } = useStories();
  const stories = getStoriesByContentType('project');

  const { currentFilters, handleFilterStateChange } = useFilterState();

  return (
    <Meta>
      <main className={`${pageName} font-inter bg-[#f4f4f4] pt-20`}>
        <div ref={ref} className={`mx-auto container py-12 md:py-24 px-6 xl:px-16 3xl:px-0 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`}>
          <Heading size='h1'>
            Projects
          </Heading>
          {currentFilters?.tag_list && currentFilters?.tag_list.length > 0 && 
            <div className='flex items-center gap-x-3 mb-6'>
              {currentFilters?.tag_list.map(( tag, index ) => (
                <span key={index} className='w-fit bg-[#43a0ed] text-white h-[37.5px] sm:h-[43px] b-[10px] sm:pb-[11px] flex items-center gap-x-3 duration-150 py-[11px] sm:py-[12px] px-5 uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]'>
                  {tag}
                </span>
              ))}
            </div>
          }
          <Filters storiesToFilter={stories} onFilterStateChange={handleFilterStateChange}>
              <Card />
          </Filters>
        </div>
      </main>
    </Meta>
  );
};

export default Projects;
