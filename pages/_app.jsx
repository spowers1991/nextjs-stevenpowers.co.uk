import { storyblokInit, apiPlugin } from "@storyblok/react";

// A story that we set up for setting Global site data. e.g site tite and menu data.
import GetStory from '@/utils/GetStory'

// CSS
import '@/css/globals.css';

// Core Layout Components
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Storyblok Layout Template Components
import Page from "@/components/content_types/Page";

// Blok Components
import SwiperSlider from "../components/blocks/SwiperSlider";
import SwiperThumbnailSlider from "../components/blocks/SwiperThumbnailSlider";
import HeadingWithCta from "../components/blocks/HeadingWithCta";
import TextWithHeadingAside from '../components/blocks/TextWithHeadingAside';
import Accordion from "../components/blocks/Accordion";
import ContactForm from "../components/blocks/ContactForm";
import LogosGrid from "../components/blocks/LogosGrid";

// Initialise Storyblok and link components to the components in our Storyblok Stories.
const components = {
  page: Page,
  swiper_slider: SwiperSlider,
  heading_with_cta: HeadingWithCta,
  text_with_heading_aside: TextWithHeadingAside,
  accordion: Accordion,
  contact_form: ContactForm,
  swiper_thumbnail_slider: SwiperThumbnailSlider,
  logos_grid: LogosGrid
};

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN || "NULL",
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps, globalSettings }) {
  return (
    <>
      <Header globalSettings={globalSettings}/>
        <Component {...pageProps} />
      <Footer />
    </>
  )
}

MyApp.getInitialProps = async () => {
  const globalSettings = await GetStory('9fb087a0-14ca-4b26-8cd6-f62feae47559');
  return { globalSettings };
};

export default MyApp;
