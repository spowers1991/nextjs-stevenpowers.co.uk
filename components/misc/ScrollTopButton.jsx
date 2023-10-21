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
      className={`fixed bg-[#434bed] hover:bg-black py-3 px-5 text-white rounded-full uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center bottom-6 right-6 z-30 duration-300 ${
        scrollPosition > 600 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none "
      }`}
      onClick={scrollToTop}
    >
      Scroll to Top
    </button>
  );
};

export default ScrollTopButton;
