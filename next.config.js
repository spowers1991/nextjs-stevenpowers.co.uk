/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.storyblok.com'], // Allow images from 'a.storyblok.com'
  },
  publicRuntimeConfig: {
    STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN, // Ensure this environment variable is set
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply this to all routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
