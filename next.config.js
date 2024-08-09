/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.storyblok.com'], // Allow images from 'a.storyblok.com'
  },
  publicRuntimeConfig: {
    STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN, // Ensure this environment variable is set
  },
};

module.exports = nextConfig;
