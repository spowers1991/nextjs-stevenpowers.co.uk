import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSettings } from '@/lib/storyblok/settings/SettingsContext';
import MobileMenu from './MobileMenu';

const Header = () => {

const { globalSettings } = useSettings();   

const router = useRouter();

const [mobileMenuToggleState, setMobileMenuToggleState] = useState(false);

function mobileMenuToggleCallback(status) {
    setMobileMenuToggleState(status);
}

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

  return (
      <header className='z-50 w-full bg-white fixed '>
        <div className={`${scrollPosition > 100 && '!py-4'} duration-500 lg:flex lg:justify-between lg:items-center py-6 mx-auto container font-inter px-6 xl:px-16 3xl:px-0`}>
            <div className="flex justify-between items-center">
                <div>
                    <Link href="/" className={`${scrollPosition > 100 && '!text-xl'} duration-500 relative font-bold text-2xl after:absolute after:h-[3px] after:left-0 after:bottom-0 after:bg-[#434bed] after:duration-1000 hover:after:w-full  ${(router.asPath === '/' || router.pathname === '/' || router.pathname === undefined) ? 'after:w-full' : 'after:w-0 '}`}>
                         {globalSettings?.content?.site_title}
                    </Link>
                    <p className="text-sm font-light text-gray-600"></p>
                </div>
                <div className="lg:hidden">
                    <div onClick={() => setMobileMenuToggleState('open')}>
                        <svg viewBox="0 0 20 20" className="inline-block w-6 h-6" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
                            <g id="icon-shape">
                                <path d="M0,3 L20,3 L20,5 L0,5 L0,3 Z M0,9 L20,9 L20,11 L0,11 L0,9 Z M0,15 L20,15 L20,17 L0,17 L0,15 Z" id="Combined-Shape"></path>
                            </g>
                        </g>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="hidden bg-gray-100 mt-4 p-4 lg:mt-0 lg:p-0 lg:bg-transparent lg:block">
                <ul className="lg:flex lg:-mx-4">
                    {globalSettings?.content?.menu.map(( item, index ) => (
                        <li key={index} className={`lg:mx-4 relative after:absolute after:h-[2px] after:left-0 after:bottom-0 after:bg-[#434bed] after:duration-1000 hover:after:w-full ${(router.asPath?.replace(/\//g, '') === item.link.cached_url?.replace(/\//g, '')) ? 'after:w-full' : 'after:w-0'}`}>
                            <Link href={item.link.cached_url}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <MobileMenu mobileMenuToggleState={mobileMenuToggleState} mobileMenuToggleCallback={mobileMenuToggleCallback} />
        </div>
      </header>
  );
};

export default Header;
