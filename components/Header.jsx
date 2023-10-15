import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = (props) => {
    
const router = useRouter();

  return (
      <header className='mx-auto container font-inter px-6 xl:px-0'>
        <div className="lg:flex lg:justify-between lg:items-center py-6">
            <div className="flex justify-between items-center">
                <div>
                    <Link href="/" className={`relative font-bold text-2xl after:absolute after:h-[3px] after:left-0 after:bottom-0 after:bg-[#434bed] after:duration-150 hover:after:w-full  ${(router.asPath === '/') ? 'after:w-full' : 'after:w-0 '}`}>
                         {props?.globalSettings?.content?.site_title}
                    </Link>
                    <p className="text-sm font-light text-gray-600"></p>
                </div>
                <div className="lg:hidden">
                    <Link href="#" aria-label="Toggle navigation" id="primary-menu-toggle">
                        <svg viewBox="0 0 20 20" className="inline-block w-6 h-6" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
                            <g id="icon-shape">
                                <path d="M0,3 L20,3 L20,5 L0,5 L0,3 Z M0,9 L20,9 L20,11 L0,11 L0,9 Z M0,15 L20,15 L20,17 L0,17 L0,15 Z" id="Combined-Shape"></path>
                            </g>
                        </g>
                        </svg>
                    </Link>
                </div>
            </div>
            <div id="primary-menu" className="hidden bg-gray-100 mt-4 p-4 lg:mt-0 lg:p-0 lg:bg-transparent lg:block">
                <ul id="menu-menu-1" className="lg:flex lg:-mx-4">
                    {props?.globalSettings?.content?.menu.map(( item, index ) => (
                        <li key={index} className={`lg:mx-4 relative after:absolute after:h-[2px] after:left-0 after:bottom-0 after:bg-[#434bed] after:duration-150 hover:after:w-full ${(router.asPath === '/'+item.link.cached_url) ? 'after:w-full' : 'after:w-0'}`}>
                            <Link href={item.link.cached_url}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </header>
  );
};

export default Header;
