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
                  <div className="hidden sm:block absolute left-6 bottom-6 sm:bottom-12 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#9043ed] py-3 px-5 text-white rounded-full uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center">
                      <div className='flex items-center gap-x-4'>
                            {slide.label} {slide.co_developer && '- Co-developer'}  
                            <svg className="w-5 h-5" fill="currentColor"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m20.998 8.498h-17.996c-.569 0-1.001.464-1.001.999 0 .118-.105-.582 1.694 10.659.077.486.496.842.988.842h14.635c.492 0 .911-.356.988-.842 1.801-11.25 1.693-10.54 1.693-10.66 0-.558-.456-.998-1.001-.998zm-.964-3.017h-16.03c-.524 0-1.001.422-1.001 1.007 0 .081-.01.016.14 1.01h17.752c.152-1.012.139-.931.139-1.009 0-.58-.469-1.008-1-1.008zm-15.973-1h15.916c.058-.436.055-.426.055-.482 0-.671-.575-1.001-1.001-1.001h-14.024c-.536 0-1.001.433-1.001 1 0 .056-.004.043.055.483z" fill-rule="nonzero"/></svg>               
                      </div>
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