import Meta from "@/components/misc/Meta";
import { getMetadata } from '@/lib/seo/helpers/getMetadata'
import { getStaticProps as fetchStaticProps } from '@/lib/storyblok/actions/generatePageData';

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Home({ story }) {
  story = useStoryblokState(story);
  const metadata = getMetadata(story);

  return (
    <Meta metadata={metadata}>
      <StoryblokComponent blok={story.content} />
    </Meta>
  );
}

export async function getStaticProps(context) {
  return fetchStaticProps(context); 
}
