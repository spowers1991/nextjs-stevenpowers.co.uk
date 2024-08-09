const getStoriesByIds = (stories, uuids) => {
  // Ensure stories is an array
  if (Array.isArray(stories)) {
    // Filter stories by the provided UUIDs
    return stories?.filter(story => uuids?.includes(story.uuid));
  } else {
    console.warn('Expected stories to be an array, but got:', stories);

    // If stories is not an array, try to find a story by UUID directly
    return uuids.map(uuid => {
      const story = Object.values(stories).find(story => story.uuid === uuid);
      return story || null; // Return null if no story is found
    }).filter(story => story !== null);
  }
};

export default getStoriesByIds;
