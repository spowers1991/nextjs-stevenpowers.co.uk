import { storyblokEditable } from "@storyblok/react";
import RichText from "../misc/RichText";
import { useInView } from 'react-intersection-observer';
import Heading from "@/components/html_tags/Heading";
import Button from "../html_tags/Button";

const HeadingWithCta = ({ blok }) => {

    const [ref, inView] = useInView({
        triggerOnce: false, // Only trigger once when it first comes into view
        threshold: 0.5,    // When 50% of the element is in view
    });

    return(
        <div ref={ref} className={`mx-auto container ${blok.border_bottom ? 'py-16 md:py-28 border-b' : 'my-16 md:my-28'} px-6 xl:px-16 3xl:px-0 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>  

            <Heading size={blok.heading_size ? blok.heading_size : 'h2'} className={`${blok?.tags?.length > 0 && '!pb-4 !mb-4'}`}>
                <RichText content={blok.title} />
            </Heading>
            
            {blok?.tags?.length > 0 && 
                <div className="flex flex-row flex-wrap gap-3 mt-6 mb-12">
                    { blok?.tags?.map(( tag, index ) => (
                            <span key={index} className="bg-[#9043ed] text-white h-[37.5px] sm:h-[43px] b-[10px] sm:pb-[11px] flex items-center gap-x-3 duration-150 py-[11px] sm:py-[12px] px-5 uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]">
                                {tag}
                            </span>
                        ))
                    }
                </div>
            }
            
            <div className="flex flex-row flex-wrap gap-3 sm:gap-3 items-center mt-[-6px] sm:mb-[-9px]">
                {blok.button_label &&
                    <Button href={blok.button_link.cached_url} newTab={blok.button_new_tab}  className="pb-[10px] sm:pb-[11px]" color={blok.button_colour}>
                        {blok.button_label} 
                    </Button>
                }

                {blok.button_2_label &&
                    <Button href={blok.button_2_link.cached_url} newTab={blok.button_2_new_tab} className="pb-[10px] sm:pb-[11px]" color={blok.button_2_colour}>
                        {blok.button_2_label}
                    </Button>
                }
            </div>
        </div>
    )
};

export default HeadingWithCta;
