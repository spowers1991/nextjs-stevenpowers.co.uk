import React from 'react';
import { storyblokEditable } from "@storyblok/react";
import { useInView } from 'react-intersection-observer';
import Heading from '@/components/html_tags/Heading'
import Filters from '@/components/storyblok/filters/Filters';
import Card from '@/components/storyblok/filters/Card';
import { useStories } from '@/lib/storyblok/stories/StoriesContext';

const StoriesGrid = ({ blok }) => {

  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger once when it first comes into view
    threshold: 0.015,   // When 1.5% of the element is in view
  });

  const { getStoriesByIds } = useStories();
  
  const pickedStories = getStoriesByIds(blok.posts);

  return (
    <div ref={ref} className={`mx-auto container my-16 md:my-28 px-6 xl:px-16 3xl:px-0 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>
      <Heading size='h3' className='mb-12'>
        {blok.title ? blok.title : 'Related Projects'}
      </Heading>
      <Filters storiesToFilter={pickedStories} showPagination={true} showOptions={false}>
          <Card />
      </Filters>
    </div>
  );
};

export default StoriesGrid;
