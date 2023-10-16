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
      <link href="https://fonts.googleapis.com/css2?family=Inter&amp;display=swap" rel="stylesheet"/>
      <form className='w-full mx-auto sm:mr-16 sm:my-auto' name="contact" method="POST"  netlify>
    <input type="hidden" name="form-name" value="contact"  />
    <input className="bg-[#fff]  rounded block w-full my-8 p-2  border-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed] placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black" type="text" id="name" name="name" placeholder='Name' required />
    <input className="bg-[#fff]  rounded block w-full my-8 p-2  border-2 focus:border-[#434bed] hover:border-[#434bed] border-solid focus:border-solid placeholder-shown:border-[#434bed] border-[#434bed]  placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black" type="text" id="email" name="email" placeholder='Email' required />
    <textarea rows="15" className=" bg-[#fff] rounded block w-full my-8 p-2  focus:border-[#434bed] border-2 hover:border-[#434bed] border-solid placeholder-shown:border-[#434bed] border-[#434bed]  focus:border-solid placeholder-shown:border-dashed focus:outline-none focus:placeholder:text-black" type="textarea" id="message" name="message" placeholder='Message' required/>
    <button className="submit-button bg-[#434bed] hover:bg-black duration-150 py-3 px-5 text-white rounded-full uppercase text-[11px] sm:text-xs font-[500] tracking-[1px] text-center" type="submit" >
        Send Message
    </button>            
</form>
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
