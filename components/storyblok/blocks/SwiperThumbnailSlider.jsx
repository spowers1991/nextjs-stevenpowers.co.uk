import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { storyblokEditable } from "@storyblok/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { Pagination, Navigation, Thumbs } from 'swiper/modules';

const SwiperSlider = ({ blok }) => {

const [thumbsSwiper, setThumbsSwiper] = useState(null);
const [imageWidth, setImageWidth] = useState(1920);
const [imageHeight, setImageHeight] = useState(800);

const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger once when it first comes into view
    threshold: 0.25,    // When 50% of the element is in view
  });

  useEffect(() => {
    // Detect viewport size on page load
    if (window.innerWidth < 768) {
      setImageWidth(315);
      setImageHeight(235);
    }

    // Cleanup function
    return () => {};
  }, []); // Empty dependency array to only run once on page load

  return (
    <>
      <div ref={ref} className={`-mt-12 sm:!-mt-16 relative duration-1000 ease-out ${inView ? 'opacity-100' : 'opacity-20'}`}  {...storyblokEditable(blok)}>
      <div className='container mx-auto flex my-6 px-6 md:px-12 xl:px-16 3xl:px-0 pt-8 lg:pt-0'>
            <div className='hidden md:flex gap-x-3 text-[#fff] ml-auto mt-6 sm:mt-0'>
              <div className={`flex items-center bg-[#434bed] py-[11px] sm:py-[12px] px-5 swiper-prev-${blok._uid} cursor-pointer duration-150`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
              </div>
              <div className={`hidden md:flex items-center bg-[#434bed] py-[11px] sm:py-[12px] px-5  swiper-next-${blok._uid} cursor-pointer  duration-150`} >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.568 18.005l-1.414-1.415 4.574-4.59-4.574-4.579 1.414-1.416 5.988 5.995-5.988 6.005z"/></svg>
              </div>
            </div>
        </div>
        <Swiper 
          slidesPerView={1.5}
          pagination={{
              type: 'progressbar',
              el:'.progressbar'
            }}
            navigation={{
              nextEl: `.swiper-next-${blok._uid}`,
              prevEl: `.swiper-prev-${blok._uid}`,
          }}
          modules={[Pagination, Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          speed={1000}
          loop={false}
          resistanceRatio={0}
          centeredSlides={false}
          spaceBetween={15}
          className={`swiper-thumbnail-slider xxl:container`}
        >
            {blok.images.map(( image, index ) => (
                <SwiperSlide className='relative group mb-2 overflow-hidden' key={index}>
                    <div className="w-full h-full relative ">
                        <Image
                            src={image.filename}
                            alt={image.alt}
                            width={imageWidth}
                            height={imageHeight}
                            className="w-full object-cover !max-h-[800px] bg-white"
                            priority={true}
                        />
                    </div>
                    <div className='overlay absolute w-full h-full left-0 top-0 bg-[#ed9043] opacity-30 z-20 duration-1000' />
                </SwiperSlide>          
            ))}    
        </Swiper>
        <Swiper
          pagination={{
            type: 'progressbar',
            el:'.progressbar'
          }}
          speed={1000}
          modules={[Thumbs, Pagination]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          breakpoints={{ 768: { slidesPerView: 5 } }}
          className='thumbs-slider'
        >
          {blok.images.map(( thumb, index ) => (
            <SwiperSlide className='cursor-pointer relative group pb-5 p-2' key={index} >                        
              <div className="w-full h-full relative">
                  <Image
                      src={thumb.filename}
                      alt={thumb.alt}
                      width={315}
                      height={235}
                      className="image w-full object-cover !max-h-[800px] opacity-30 duration-1000 bg-white"
                      lazy="true"
                  />
                  <div className='overlay absolute w-full h-full left-0 top-0 bg-[#ed9043] opacity-20 z-20' />
                  <div className='absolute top-0 progress w-0 h-1 sm:h-2 duration-1000 bg-[#434bed] z-30' />
              </div>
            </SwiperSlide> 
          ))}
        </Swiper>
        <div className='relative container px-6 xl:px-12 3xl:px-6 mx-auto'> 
          <div className='max-w-[90%] sm:max-w-[91%] 2xl:max-w-[100%] px-6 progressbar !h-1 sm:!h-2 !top-[unset] bottom-0 z-20 !bg-[#ccc] [&_span]:!bg-[#434bed] left-0 right-0 mx-auto'/>
        </div> 
      </div>
    </>
  );
}

export default SwiperSlider;