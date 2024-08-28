
import { storyblokEditable } from "@storyblok/react";
import Heading from "@/components//html_tags/Heading";
import RichText from "@/components/storyblok/plugins/storyblok-rich-text-react-renderer/RichText";
import { useInView } from 'react-intersection-observer';

const TextWithHeadingAside = ({ blok }) => {

    const [ref, inView] = useInView({
        triggerOnce: false, // Only trigger once when it first comes into view
        threshold: 0.5,    // When 50% of the element is in view
    });

    return(
        <div ref={ref} className={`container mx-auto px-6 md:px-12 xl:px-16 3xl:px-0 my-12 md:my-24 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>
            <div className={`items-center grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20  ${blok.border && 'pb-10 md:pb-24 border-b'}`}>
                <Heading size="h3" className={`text-3xl sm:text-4xl md:text-5xl font-bold z-20 order-first ${blok.row_reverse ? 'md:order-last md:text-right' : 'md:order-first md:text-left'} text-left `}>
                    <RichText content={blok.title} />    
                </Heading>

                <div className="text-base sm:text-lg">
                    <RichText content={blok.content}  className={'pb-3'}/>
                </div>
            </div>     
        </div>
    )
}

export default TextWithHeadingAside;