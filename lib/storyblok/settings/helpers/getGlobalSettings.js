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

const getGlobalSettings = async (storyUuid) => {
  try {
    const response = await storyblokClient.get(`cdn/stories/settings`);
    const story = response.data.story;
    return story;
  } catch (error) {
    console.error("Error fetching story:", error);
    return null;
  }
};

export default getGlobalSettings;
