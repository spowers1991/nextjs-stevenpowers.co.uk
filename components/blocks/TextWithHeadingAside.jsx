
import { storyblokEditable } from "@storyblok/react";
import Heading from "../../utils/Heading";
import RichText from "../../utils/RichText";
import { useInView } from 'react-intersection-observer';

const TextWithHeadingAside = ({ blok }) => {

    const [ref, inView] = useInView({
        triggerOnce: false, // Only trigger once when it first comes into view
        threshold: 0.5,    // When 50% of the element is in view
    });

    return(
        <div ref={ref} className={`container mx-auto px-6 xl:px-0 items-center grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20  py-16 md:py-24 border-b duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>
            
            <Heading size="h3" className={`text-3xl sm:text-4xl md:text-5xl font-bold z-20 order-first ${blok.row_reverse ? 'md:order-last md:text-right' : 'md:order-first md:text-left'} text-left `}>
                {blok.title}    
            </Heading>

            <div className="text-lg">
                <RichText content={blok.content}/>
            </div>
          
        </div>
    )
}

export default TextWithHeadingAside;