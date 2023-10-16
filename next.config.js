/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['a.storyblok.com'], // Add 'a.storyblok.com' to the list of allowed domains
    },
    async redirects() {
      return [
        {
          source: '/:path*',
          destination: '/',
          permanent: false,
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  