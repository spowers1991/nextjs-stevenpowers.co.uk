import React from 'react';
import Meta from "@/components/misc/Meta";
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Heading from '@/components/html_tags/Heading';
import { useStoryblok } from '@/lib/storyblok/StoryblokContext';
import Link from 'next/link';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.015,
  });

  const { getStoriesByContentType } = useStoryblok();
  const stories = getStoriesByContentType('project');

  return (
    <Meta>
      <main className={`font-inter bg-[#f4f4f4] overflow-hidden pt-20`}>
        <div ref={ref} className={`mx-auto container py-12 md:py-24 px-6 xl:px-16 3xl:px-0 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`}>
          <Heading size='h1'>Projects</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {stories.map((story) => {
              // Extract the first full width image block from the story content
              const FirstFullWidthImageBlok = story.content.body.find(block => block.component === "full_width_image");
              
              return (
                <Link key={story.uuid} href={`/projects/${story.slug}`} passHref>
                  <div className='relative col-span-1 bg-white flex flex-col h-full cursor-pointer'>
                    <div className='relative overflow-hidden flex items-center flex-shrink-0'>
                      {FirstFullWidthImageBlok?.image?.filename && (
                        <Image
                          src={FirstFullWidthImageBlok.image.filename}
                          alt={FirstFullWidthImageBlok.image.alt}
                          width={800}
                          height={600}
                          className="w-full object-cover"
                          priority={true}
                        />
                      )}
                      <div className='bg-[#434bed] opacity-20 absolute w-full h-full left-0 top-0' />
                    </div>
                    <div className='p-6 flex flex-col flex-grow gap-y-6 '>
                      <h3 className='text-xl sm:text-2xl md:text-2xl font-bold z-20 leading-[1.1] md:leading-[1] [&_u]:text-[#434bed] [&_u]:underline'>
                        {story.name}
                      </h3>
                      {story?.content?.meta_description && (
                        <div>
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
              );
            })}
          </div>
        </div>
      </main>
    </Meta>
  );
};

export default Projects;
