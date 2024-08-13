import React, {useEffect} from 'react';
import { storyblokEditable } from "@storyblok/react";
import { useInView } from 'react-intersection-observer';
import { useStories } from '@/lib/storyblok/stories/StoriesContext';
import Heading from '@/components/html_tags/Heading'
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/components/storyblok/filters/selectors/Pagination';
import { useFilters } from '@/lib/storyblok/filters/FiltersContext';

const StoriesGrid = ({ blok }) => {

  const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger once when it first comes into view
    threshold: 0.015,   // When 1.5% of the element is in view
  });

  const { filteredStories, setFilteredStories } = useFilters();
  
  
  const { getStoriesByIds, getStoriesTags } = useStories();
  const pickedStories = getStoriesByIds(blok.posts);
  const tags = getStoriesTags(pickedStories)

  useEffect(() => {
    filteredStories?.length > 0 ?
      setFilteredStories(pickedStories?.slice(0, 6))
      :
      setFilteredStories(pickedStories?.slice(0, 6))
  }, [ setFilteredStories]);

  let FirstFullWidthImageBlok = null;
  const blurDataURL = "data:image/jpeg;base64,..."

  return (
    <div ref={ref} className={`mx-auto container my-16 md:my-28 px-6 xl:px-16 3xl:px-0 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>
      <Heading size='h3' className='mb-12'>
        {blok.title ? blok.title : 'Related Projects'}
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {filteredStories?.map((story, index) => (
          // Get the image from the first full width image block is on the post.
          FirstFullWidthImageBlok = story.content.body.filter(story => story.component === "full_width_image")[0],
          
          <div key={story.uuid} className='grod-cols-1'>
            <Link key={story.uuid} href={`/projects/${story.slug}`} passHref>
              <div className='relative col-span-1 bg-white flex flex-col h-full cursor-pointer hover:shadow-2xl duration-150'>
                <div className='relative overflow-hidden flex items-center flex-shrink-0'>
                  {FirstFullWidthImageBlok?.image?.filename && (
                    <Image
                      src={FirstFullWidthImageBlok.image.filename}
                      alt={FirstFullWidthImageBlok.image.alt}
                      width={800}
                      height={600}
                      className="w-full object-cover bg-white"
                      priority={true}
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                  )}
                  <div className='bg-[#434bed] opacity-20 absolute w-full h-full left-0 top-0' />
                </div>
                <div className='p-6 flex flex-col flex-grow gap-y-6 '>
                  <h3 className='text-xl sm:text-2xl md:text-2xl font-bold z-20 leading-[1.1] md:leading-[1] [&_u]:text-[#434bed] [&_u]:underline'>
                    {story.name}
                  </h3>
                  {tags?.length > 0 && 
                    <div className="flex flex-col gap-2"> 
                      <span className="uppercase text-[11px] sm:text-xs font-[700] tracking-[1px]">
                        Tags:
                      </span>
                      <div className="flex flex-row flex-wrap gap-3">
                          { tags[index]?.map(( tag, index ) => (
                                  <span key={index} className="bg-[#9043ed] text-white h-[37.5px] sm:h-[43px] b-[10px] sm:pb-[11px] flex items-center gap-x-3 duration-150 py-[11px] sm:py-[12px] px-5 uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]">
                                      {tag}
                                  </span>
                              ))
                          }
                      </div>
                    </div>
                  }
                  {story?.content?.meta_description && (
                    <div className='text-base sm:text-lg'>
                      {story.content.meta_description}
                    </div>
                  )}
                  <div className={`w-fit flex items-center gap-x-3 bg-[#434bed] text-white duration-150 py-[11px] sm:py-[12px] px-5 uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] mt-auto`}>
                    <div className={`flex items-center gap-3 sm:gap-x-4`}>
                        Read more
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/>
                        </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {pickedStories.length > 3 &&
        <Pagination stories={pickedStories} storiesPerPage={3} />
       }
    </div>
  );
};

export default StoriesGrid;
