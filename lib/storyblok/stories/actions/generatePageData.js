import { getStoryblokApi } from "@storyblok/react";

export const getStaticProps = async (context) => {
  // Determine if 'params' exists and set the slug accordingly
  let slug = context.params && context.params.slug ? context.params.slug.join("/") : "home";

  // Define the Storyblok API parameters
  let sbParams = { version: "draft" }; // or 'published'

  // Fetch the story from Storyblok
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  // Return the fetched data as props
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 60,
  };
};
