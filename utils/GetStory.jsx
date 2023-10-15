import { getStoryblokApi } from "@storyblok/react";

const GetStory = async (storyUuid) => {
  const storyblokApi = getStoryblokApi();
  
  try {
    const response = await storyblokApi.get(`cdn/stories/settings`);
    const story = response.data.story;
    return story;
  } catch (error) {
    console.error("Error fetching story:", error);
    return null;
  }
};

export default GetStory;
