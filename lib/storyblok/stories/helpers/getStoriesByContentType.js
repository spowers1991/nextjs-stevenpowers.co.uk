const getStoriesByContentType = (stories, contentType) => {
  return stories?.filter(story => story.content.component === contentType);
};

export default getStoriesByContentType;
