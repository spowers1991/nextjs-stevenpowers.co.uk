import { storyblokEditable } from "@storyblok/react";
import RichText from "../misc/RichText";
import { useInView } from 'react-intersection-observer';
import Heading from "@/components/html_tags/Heading";
import Button from "../html_tags/Button";
import Image from 'next/image';

const SplitImage = ({ blok }) => {

    const [ref, inView] = useInView({
        triggerOnce: false, // Only trigger once when it first comes into view
        threshold: 0.015,    // When 50% of the element is in view
    });

    return(
        <div ref={ref} className={`mx-auto container px-6 xl:px-16 3xl:px-0 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>  
            <div className="flex flex-row gap-3 ">
                {blok.images?.map(( image, index ) => (
                        <div key={index} className="w-full sm:w-1/2">
                            <Image
                                src={image.filename}
                                alt={image.alt}
                                width={1920}
                                height={800}
                                className="w-full object-cover"
                                priority={true}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default SplitImage