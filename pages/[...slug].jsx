import Meta from "@/components/seo/Meta";
import { getMetaData } from '@/lib/seo/helpers/getMetaData';
import { getStaticPaths as fetchStaticPaths } from '@/lib/storyblok/stories/actions/generatePages';
import { getStaticProps as fetchStaticProps } from '@/lib/storyblok/stories/actions/generatePageData';
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export default function Page({ story }) {
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

export async function getStaticPaths() {
  return fetchStaticPaths();  
}