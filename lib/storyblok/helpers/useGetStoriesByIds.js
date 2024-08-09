import { useStoryblok } from '@/lib/storyblok/StoryblokContext';

const useGetStoriesByIds = (uuids) => {
  const { stories } = useStoryblok();

  if (Array.isArray(stories)) {
    return stories.filter(story => uuids.includes(story.uuid));
  } else {
    console.warn('Expected stories to be an array, but got:', stories);

    return uuids.map(uuid => {
      const story = Object.values(stories).find(story => story.uuid === uuid);
      return story || null;
    }).filter(story => story !== null);
  }
};

export default useGetStoriesByIds;
