import React, { ReactNode } from 'react';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import ScrollTopButton from '@/components/ScrollTopButton'

interface LayoutProps {
  children: ReactNode;
  metadata: {
    title: string;
    description: string;
    keywords: string;
    no_index: string;
    url: string;
    og_image : string;
  };
}

const Layout = ({ children, metadata }: LayoutProps) => {

  console.log(metadata)

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords.toString()} />
        <meta name="robots" content={metadata.no_index} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={`https://www.stevenpowers.co.uk/${metadata.url}`} />
        <meta property="og:image" content={metadata.og_image} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&amp;display=swap" rel="stylesheet"/>
      </Head>
      {children}
      <ScrollTopButton />
    </>
  );
};

export default Layout;
