import StoryblokClient from 'storyblok-js-client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const storyblokClient = new StoryblokClient({
  accessToken: publicRuntimeConfig.STORYBLOK_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});

const getAllStories = async () => {
  try {
    const response = await storyblokClient.get('cdn/stories');
    return response.data.stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return null;
  }
};

export default getAllStories;
