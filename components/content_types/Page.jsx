import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Page = ({ blok }) => (
  <main {...storyblokEditable(blok)} className={`font-inter bg-[#f4f4f4] overflow-hidden`}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;
