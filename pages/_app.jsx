import { storyblokInit, apiPlugin } from "@storyblok/react";
import App from 'next/app'; // Import the default App component from Next.js

// Context providers
import { StoryblokProvider } from '@/lib/storyblok/StoryblokContext';

// Fetch requests
import getGlobalSettings from '@/lib/storyblok/helpers/getGlobalSettings';
import getAllStories from '@/lib/storyblok/helpers/getAllStories';

// CSS
import '@/css/globals.css';

// Core Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Storyblok Layout Template Components
import Page from "@/components/content_types/Page";
import Project from "@/components/content_types/Project";

// Blok Components
import SwiperSlider from "../components/blocks/SwiperSlider";
import SwiperThumbnailSlider from "../components/blocks/SwiperThumbnailSlider";
import HeadingWithCta from "../components/blocks/HeadingWithCta";
import TextWithHeadingAside from '../components/blocks/TextWithHeadingAside';
import Accordion from "../components/blocks/Accordion";
import ContactForm from "../components/blocks/ContactForm";
import LogosGrid from "../components/blocks/LogosGrid";
import FullWidthImage from "../components/blocks/FullWidthImage";
import SplitImage from "../components/blocks/SplitImage";
import PostsGrid from "../components/blocks/PostsGrid";

// Initialise Storyblok and link components to the components in our Storyblok Stories.
const components = {
  page: Page,
  project: Project,
  swiper_slider: SwiperSlider,
  heading_with_cta: HeadingWithCta,
  text_with_heading_aside: TextWithHeadingAside,
  accordion: Accordion,
  contact_form: ContactForm,
  swiper_thumbnail_slider: SwiperThumbnailSlider,
  logos_grid: LogosGrid,
  full_width_image: FullWidthImage,
  split_image: SplitImage,
  posts_grid: PostsGrid
};

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN || "NULL",
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps, stories, globalSettings }) {
  return (
    <StoryblokProvider stories={stories} globalSettings={globalSettings}>
      <Header />
        <Component {...pageProps} />
      <Footer />
    </StoryblokProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // Call the default App getInitialProps
  const appProps = await App.getInitialProps(appContext);

  // Fetch your custom data
  const globalSettings = await getGlobalSettings();
  const stories = await getAllStories();

  return {
    ...appProps,
    stories,
    globalSettings,
  };
};

export default MyApp;
