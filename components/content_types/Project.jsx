import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Project = ({ blok }) => (
  <main {...storyblokEditable(blok)} className={`font-inter bg-[#f4f4f4] overflow-hidden pt-20`}>
    {blok.body.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Project;
