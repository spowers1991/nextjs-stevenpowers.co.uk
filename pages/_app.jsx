// The default App component from Next.js
import App from 'next/app'; 
import LoadingScreen from '../components/utils/LoadingScreen';

// Storyblok API plugins
import { storyblokInit, apiPlugin } from "@storyblok/react";

// Context providers
import { SettingsProvider } from '@/lib/storyblok/settings/SettingsContext'
import { StoriesProvider } from '@/lib/storyblok/stories/StoriesContext';

// Fetch requests
import getGlobalSettings from '@/lib/storyblok/settings/helpers/getGlobalSettings';
import getAllStories from '@/lib/storyblok/stories/helpers/getAllStories';

// CSS
import '@/css/globals.css';

// Core Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Storyblok Content Type Components
import Page from "@/components/content_types/Page";
import Project from "@/components/content_types/Project";

// Storyblok Blok Components
import SwiperSlider from "../components/storyblok/blocks/SwiperSlider";
import SwiperThumbnailSlider from "../components/storyblok/blocks/SwiperThumbnailSlider";
import HeadingWithCta from "../components/storyblok/blocks/HeadingWithCta";
import TextWithHeadingAside from '../components/storyblok/blocks/TextWithHeadingAside';
import Accordion from "../components/storyblok/blocks/Accordion";
import ContactForm from "../components/storyblok/blocks/ContactForm";
import LogosGrid from "../components/storyblok/blocks/LogosGrid";
import FullWidthImage from "../components/storyblok/blocks/FullWidthImage";
import SplitImage from "../components/storyblok/blocks/SplitImage";
import StoriesGrid from "../components/storyblok/blocks/StoriesGrid";

// Link Storyblok Components to the Custom Fields in Storyblok .
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
  posts_grid: StoriesGrid
};

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN || "NULL",
  use: [apiPlugin],
  components,
});

function NextApp({ Component, pageProps, stories, globalSettings }) {

  return (
    <SettingsProvider initialSettings={globalSettings}>
      <StoriesProvider stories={stories}>
        <Header />
          <LoadingScreen>
            <Component {...pageProps} />
          </LoadingScreen>
        <Footer />
      </StoriesProvider>
    </SettingsProvider>
  );
}

NextApp.getInitialProps = async (appContext) => {
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

export default NextApp;
