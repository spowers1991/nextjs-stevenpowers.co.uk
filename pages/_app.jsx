import { storyblokInit, apiPlugin } from "@storyblok/react";
import Head from 'next/head';

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
import StaticImagesSlider from "../components/blocks/StaticImagesSlider";
import OffsetImagesWithAnimation from '../components/blocks/OffsetImagesWithAnimation'
import HeadingWithCta from "../components/blocks/HeadingWithCta";
import TextWithHeadingAside from '../components/blocks/TextWithHeadingAside';
import Accordion from "../components/blocks/Accordion";
import ContactForm from "../components/blocks/ContactForm";

// Initialise Storyblok and link components to the components in our Storyblok Stories.
const components = {
  page: Page,
  swiper_slider: SwiperSlider,
  offset_images_with_animation: OffsetImagesWithAnimation,
  heading_with_cta: HeadingWithCta,
  text_with_heading_aside: TextWithHeadingAside,
  accordion: Accordion,
  contact_form: ContactForm,
  static_images_slider: StaticImagesSlider
};

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN || "NULL",
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps, globalSettings }) {
  return (
    <>
      <Head>
        <html lang="en" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap" rel="stylesheet" async />
      </Head>
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
