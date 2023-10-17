import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { storyblokEditable } from "@storyblok/react";
import Link from 'next/link';

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
      <div ref={ref} className={`relative duration-1000 ease-out ${inView ? 'opacity-100' : 'opacity-20'}`}  {...storyblokEditable(blok)}>
        <Swiper
          slidesPerView={1.5}
          pagination={{
              type: 'progressbar',
              el:'.progressbar'
            }}
          navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          }}
          modules={[Pagination, Navigation]}
          speed={800}
          loop={false}
          resistanceRatio={0}
          centeredSlides={false}
          spaceBetween={15}
          className={`swiperSlider my-16 md:my-24 xxl:container`}
        >
          {blok.slides.map(( slide, index ) => (
            <SwiperSlide className='relative group pb-6' key={index}>
              <Link href={slide.link.cached_url} target="_blank"> 
                <div className="w-full h-full relative ">
                  <Image
                    src={slide.image.filename}
                    alt={slide.image.alt}
                    width={1920}
                    height={800}
                    className="w-full object-cover !max-h-[800px]"
                    priority={true}
                  />
                  <div className="absolute left-6 bottom-6 sm:bottom-12 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#9043ed] py-3 px-5 text-white rounded-full uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center">
                      {slide.label} {slide.co_developer && '- Co-developer'}                 
                  </div>
                </div>
              </Link>
            </SwiperSlide>          
          ))} 
          <div className='relative container px-6 xl:px-12 3xl:px-6 mx-auto'> 
            <div className='max-w-[86%] sm:max-w-[90%] 3xl:max-w-[100%] px-6 progressbar !h-1 sm:!h-2 !top-[unset] bottom-0 z-20 !bg-[#ccc] [&_span]:!bg-[#434bed] left-0 right-0 mx-auto'/>
          </div>  
        </Swiper>
      </div>
    </>
  );
}

export default SwiperSlider;