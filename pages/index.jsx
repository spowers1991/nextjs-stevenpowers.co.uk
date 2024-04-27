import Layout from "@/components/layout/Layout"

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Home({ story }) {
  story = useStoryblokState(story);

  const metadata = {
    title: 'Steven Powers',
    description: 'I am a Full-stack web developer with years of agency experience, working together on some international and award winning websites.',
    keywords: 'Full-stack Web Developer, Web Developer, React, Storyblok, Wordpress, Huddersfield, United Kingdom',
    no_index: 'index, follow',
    url: 'https//:www.stevenpowers.co.uk/',
    og_image: 'https://a.storyblok.com/f/256039/500x374/ae4bdebf26/steven-powers.jpg'
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
