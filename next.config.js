/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.storyblok.com'],
  },
  publicRuntimeConfig: {
    STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN, 
  },
};

module.exports = nextConfig;
