import React, { useState, useEffect } from "react";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { useMediaQuery } from 'react-responsive';

const OffsetImagesWithAnimation = ({ blok }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Function to update the scroll position in pixels
  const updateScrollPosition = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setScrollPosition(scrollTop);
  };

  // Update scroll position on scroll
  useEffect(() => {
    window.addEventListener("scroll", updateScrollPosition);
    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);

  const loadingBarWidthArray = ['w-16 sm:w-32', 'w-6 sm:w-12', 'w-12 sm:w-24', 'w-16']

  const isMobile = useMediaQuery({ maxWidth: 900 });

  return (
    <div className="xxl:container xxl:mx-auto grid grid-cols-3 lg:grid-cols-4 pb-0 sm:pb-16 md:pb-24 select-none" {...storyblokEditable(blok)}>
      {blok.images.map(( image, index ) => (
        <div className={`${(isMobile && index === 3) && 'hidden'} overflow-hidden relative ${index%2 == 0 && 'top-[15px] sm:top-[50px]'} h-[fit-content] duration-500 ${
            scrollPosition > (index+1)*100-100
              ? "translate-y-[15px] sm:translate-y-[50px] opacity-100"
              : "translate-y-[0px] sm:translate-y-[0px] opacity-20"
          }`}
          key={index}
        >
          <Image
            src={image.filename} // Replace with the path to your image
            alt={image.alt}
            width={500} // Specify the width of the image
            height={500} // Specify the height of the image
            className="w-full"
            priority={true}
          />
          <div className="absolute z-20 top-0 h-full w-full" />
          <div
            className={`absolute z-10 bottom-0 left-0 h-1 sm:h-2 ${
              scrollPosition > (index+1)*100-100 ? "w-full" : loadingBarWidthArray[index]
            } duration-500 bg-[#434bed] `}
          />
        </div>
      ))}  
    </div>
  );
};

export default OffsetImagesWithAnimation;
