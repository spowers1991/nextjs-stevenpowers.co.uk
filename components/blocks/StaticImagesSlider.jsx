import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { storyblokEditable } from "@storyblok/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const SwiperSlider = ({ blok }) => {

const [ref, inView] = useInView({
    triggerOnce: false, // Only trigger once when it first comes into view
    threshold: 0.5,    // When 50% of the element is in view
  });
console.log(blok._uid)
  return (
    <>
      <div ref={ref} className={`relative duration-1000 ease-out ${inView ? 'opacity-100' : 'opacity-20'}`}  {...storyblokEditable(blok)}>
      <div className='container mx-auto flex my-6 px-6 xl:px-16 3xl:px-0 pt-8 lg:pt-0'>
            <div className='hidden md:flex gap-x-3 text-[#fff] ml-auto mt-6 sm:mt-0'>
              <div className={`flex items-center bg-[#434bed] w-10 h-10 sm:w-12 sm:h-12   swiper-prev-${blok._uid} cursor-pointer duration-150`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z"/></svg>
              </div>
              <div className={`hidden md:flex items-center bg-[#434bed] w-10 h-10 sm:w-12 sm:h-12  swiper-next-${blok._uid} cursor-pointer  duration-150`} >
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
          modules={[Pagination, Navigation]}
          speed={800}
          loop={false}
          resistanceRatio={0}
          centeredSlides={false}
          spaceBetween={15}
          className={`static-images-slider xxl:container`}
        >
            {blok.images.map(( image, index ) => (
                <SwiperSlide className='relative group pb-6' key={index}>
                    <div className="w-full h-full relative ">
                        <Image
                            src={image.filename}
                            alt={image.alt}
                            width={1920}
                            height={800}
                            className="w-full object-cover !max-h-[800px]"
                            priority={true}
                        />
                    </div>
                </SwiperSlide>          
            ))}    
          <div className='relative container px-6 xl:px-12 3xl:px-6 mx-auto'> 
            <div className='max-w-[86%] sm:max-w-[90%] progressbar !h-1 sm:!h-2 !top-[unset] bottom-0 z-20 !bg-[#ccc] [&_span]:!bg-[#434bed] left-0 right-0 mx-auto'/>
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default SwiperSlider;