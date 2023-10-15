import Layout from "@/app/layout"

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Home({ story }) {
  story = useStoryblokState(story);

  const metadata = {
    title: 'Steven Powers',
    description: 'This is my portfolio site.',
    keywords: 'test',
    no_index: 'index, follow',
    url: 'https:stevenpowers.co.uk/',
    og_image: 'https://a.storyblok.com/f/256039/500x668/42a6b530eb/steven_2.jpg'
  };

  return (
    <Layout metadata={metadata}>
      <StoryblokComponent blok={story.content} />
    </Layout>
  );
}

export async function getStaticProps() {
  let slug = "home";

  let sbParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
