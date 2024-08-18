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

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.015,
  });

  const pageName = getPageName();

  const { getStoriesByContentType } = useStories();
  const stories = getStoriesByContentType('project');

  return (
    <Meta>
      <main className={`${pageName} font-inter bg-[#f4f4f4] pt-20`}>
        <div ref={ref} className={`mx-auto container py-12 md:py-24 px-6 xl:px-16 3xl:px-0 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`}>
          <Heading size='h1'>
            Projects
          </Heading>
          <Filters storiesToFilter={stories}>
              <Card />
          </Filters>
        </div>
      </main>
    </Meta>
  );
};

export default Projects;
