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

  return (
    <>
      <div ref={ref} className={`sm:-mt-24 relative duration-1000 ease-out ${inView ? 'opacity-100' : 'opacity-20'}`}  {...storyblokEditable(blok)}>
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
          speed={1000}
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
            <div className='max-w-[90%] sm:max-w-[91%] 2xl:max-w-[100%] px-6 progressbar !h-1 sm:!h-2 !top-[unset] bottom-0 z-20 !bg-[#ccc] [&_span]:!bg-[#434bed] left-0 right-0 mx-auto'/>
          </div> 
        </Swiper>
      </div>
    </>
  );
}

export default SwiperSlider;