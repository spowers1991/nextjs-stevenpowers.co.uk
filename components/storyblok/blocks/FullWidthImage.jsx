import { storyblokEditable } from "@storyblok/react";
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const FullWidthImage = ({ blok }) => {

    const [ref, inView] = useInView({
        triggerOnce: false, // Only trigger once when it first comes into view
        threshold: 0.015,    // When 50% of the element is in view
    });

    const blurDataURL = "data:image/jpeg;base64,..."
    
    return(
        <div ref={ref} className={`mx-auto container px-6 xl:px-16 3xl:px-0 my-12 md:my-24 duration-[2s] ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>  
            <Image
                src={blok.image.filename}
                alt={blok.image.alt}
                width={1920}
                height={800}
                className="w-full object-cover bg-white"
                priority={true}
                placeholder="blur"
                blurDataURL={blurDataURL}
            />
        </div>
    )
};

export default FullWidthImage