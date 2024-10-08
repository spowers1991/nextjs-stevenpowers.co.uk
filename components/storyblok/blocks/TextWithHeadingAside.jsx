
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
        <div ref={ref} className={`container mx-auto px-6 md:px-12 xl:px-16 3xl:px-0 my-12 md:my-24 duration-[1.25s] ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>
            <div className={`items-center grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20  ${blok.border && 'pb-10 md:pb-24 border-b'}`}>
                <Heading size="h3" className={`text-3xl sm:text-4xl md:text-5xl font-bold z-20 order-first ${blok.row_reverse ? 'md:order-last md:text-right' : 'md:order-first md:text-left'} text-left `}>
                    <RichText content={blok.title} />    
                </Heading>

                <div className="flex gap-12 text-base sm:text-lg md:text-2xl">
                    <span className="opacity-100">
                        <svg className="w-[25px] h-[25px] sm:w-[35px] sm:h-[35px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    </span>
                    <div>
                    <RichText content={blok.content}  className={'pb-3'}/>
                    </div>
                </div>
            </div>     
        </div>
    )
}

export default TextWithHeadingAside;