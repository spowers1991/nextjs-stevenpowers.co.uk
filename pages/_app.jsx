import { storyblokInit, apiPlugin } from "@storyblok/react";
import GetStory from '@/utils/GetStory'

// Core Components
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Storyblok Template Components
import Page from "../components/Page";

// Blok Components
import SwiperSlider from "../components/blocks/SwiperSlider";
import OffsetImagesWithAnimation from '../components/blocks/OffsetImagesWithAnimation'
import HeadingWithCta from "../components/blocks/HeadingWithCta";
import TextWithHeadingAside from '../components/blocks/TextWithHeadingAside';
import Accordion from "../components/blocks/Accordion";
import ContactForm from "../components/blocks/ContactForm";

const components = {
  page: Page,
  swiper_slider: SwiperSlider,
  offset_images_with_animation: OffsetImagesWithAnimation,
  heading_with_cta: HeadingWithCta,
  text_with_heading_aside: TextWithHeadingAside,
  accordion: Accordion,
  contact_form: ContactForm
};

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps, globalSettings }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter&amp;display=swap" rel="stylesheet" async />
      
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
