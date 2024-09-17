import { storyblokEditable } from "@storyblok/react";
import RichText from "@/components/storyblok/plugins/storyblok-rich-text-react-renderer/RichText";
import { useInView } from 'react-intersection-observer';
import Heading from "@/components/html_tags/Heading";
import Tags from '@/components/storyblok/blocks/partials/Tags'
import Button from "@/components/html_tags/Button";

const HeadingWithCta = ({ blok, story }) => {

    const [ref, inView] = useInView({
        triggerOnce: false, // Only trigger once when it first comes into view
        threshold: 0.5,    // When 50% of the element is in view
    });
    
    return(
        <div ref={ref} className={`mx-auto container ${blok.border_bottom ? 'py-16 md:py-28 border-b' : 'my-16 md:my-28'} px-6 md:px-12 xl:px-16 3xl:px-0 duration-500 ${inView ? 'opacity-100' : 'opacity-20'}`} {...storyblokEditable(blok)}>             
            <div className="flex flex-col sm:flex-row">
                <div className={`${blok.meta_field ? 'w-1/2' : 'w-full'} : flex flex-col gap-y-6`}>
                    
                    <Heading size={blok.heading_size ? blok.heading_size : 'h2'} className={`${blok?.tags?.length > 0 ? '!pb-0 !mb-0' : '!pb-3 !mb-0'}`}>
                        <RichText content={blok.title} />
                    </Heading>

                    <Tags tags={blok?.tags?.length > 0 ? blok?.tags : story?.tag_list}/>

                    {blok.button_label &&
                        <div className="flex flex-row flex-wrap gap-3 sm:gap-3 items-center">
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
                    }

                </div>
                {blok?.meta_info &&
                    blok?.meta_info.length > 0 &&
                        <div className="w-full sm:w-1/2 self-end flex mt-12 sm:mt-0">
                            <div className="sm:ml-auto">
                                { blok?.meta_info?.map(( meta_field, index ) => (
                                        <div key={index}>
                                            <span className="uppercase text-[11px] sm:text-xs tracking-[1px] mr-1">
                                                {meta_field.label}:
                                            </span> 
                                            <span className="uppercase text-[11px] sm:text-xs font-[700] tracking-[1px]">
                                                {meta_field.value}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
};

export default HeadingWithCta;
