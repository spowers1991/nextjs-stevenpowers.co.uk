import { storyblokEditable } from "@storyblok/react";
import RichText from "../../utils/RichText";
import { useInView } from 'react-intersection-observer';
import Heading from "../../utils/Heading";
import Button from "../../utils/Button";

const HeadingWithCta = ({ blok }) => {

    const [ref, inView] = useInView({
        triggerOnce: false, // Only trigger once when it first comes into view
        threshold: 0.5,    // When 50% of the element is in view
    });

    return(
        <div ref={ref} className={`mx-auto container ${blok.border_bottom ? 'py-16 md:py-28 border-b' : 'my-16 md:my-28 xl:my-36'} px-6 xl:px-16 3xl:px-0 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>  

            <Heading size={blok.heading_size ? blok.heading_size : 'h2'}>
                <RichText content={blok.title} />
            </Heading>
            <div class="flex flex-row flex-wrap gap-3 items-center mt-[-6px] sm:mb-[-9px]">
                {blok.button_label &&
                    <Button href={blok.button_link.cached_url} newTab={blok.button_new_tab} className="pb-[10px] sm:pb-[11px]">
                        {blok.button_label} 
                    </Button>
                }

                {blok.button_2_label &&
                    <Button href={blok.button_2_link.cached_url} color='purple' className="pb-[10px] sm:pb-[11px]" newTab={blok.button_2_new_tab}>
                        {blok.button_2_label}
                    </Button>
                }
            </div>
        </div>
    )
};

export default HeadingWithCta;
