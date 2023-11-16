import React, { useState, useEffect } from "react";

const ScrollTopButton = () => {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling for a nicer effect
    });
  };

  return (
    <button
      className={`font-inter fixed bg-[#434bed]  py-3 px-5 text-white  uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center bottom-6 right-6 z-30 duration-500 ${
        scrollPosition > 600 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none "
      }`}
      onClick={scrollToTop}
    >
      <div className='flex items-center gap-3 sm:gap-x-4'>
        Scroll to Top 
        <svg  className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z"/></svg>
      </div>
    </button>
  );
};

export default ScrollTopButton;
