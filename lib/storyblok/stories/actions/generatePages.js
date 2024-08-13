import { getStoryblokApi } from "@storyblok/react";

export const getStaticPaths = async () => {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/");

  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home") {
      return;
    }
    if (data.links[linkKey].slug !== "settings") {
      const slug = data.links[linkKey].slug;
      let splittedSlug = slug.split("/");
      paths.push({ params: { slug: splittedSlug } });
    }
  });

  return {
    paths: paths,
    fallback: false,
  };
};
