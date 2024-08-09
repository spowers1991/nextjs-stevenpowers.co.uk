import Meta from "@/components/misc/Meta";
import { getMetaData } from '@/lib/seo/helpers/getMetaData'
import { getStaticProps as fetchStaticProps } from '@/lib/storyblok/actions/generatePageData';

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";

export default function Home({ story }) {
  story = useStoryblokState(story);
  const metadata = getMetaData(story);

  return (
    <Meta metadata={metadata}>
      <StoryblokComponent blok={story.content} />
    </Meta>
  );
}

export async function getStaticProps(context) {
  return fetchStaticProps(context); 
}
