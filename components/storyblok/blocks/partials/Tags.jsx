import React from 'react';

const Tags = ({ tags }) => {

  return (
    <>
        { tags?.length > 0 && 
            <div className="flex flex-col gap-2"> 
                <span className="uppercase text-[11px] sm:text-xs font-[700] tracking-[1px]">
                    Tags:
                </span>
                <div className="flex flex-row flex-wrap gap-3">
                    { tags?.map(( tag, index ) => (
                            <span key={index} className="bg-[#9043ed] text-white h-[37.5px] sm:h-[43px] b-[10px] sm:pb-[11px] flex items-center gap-x-3 duration-150 py-[11px] sm:py-[12px] px-5 uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]">
                                {tag}
                            </span>
                        ))
                    }
                </div>
            </div>
        }
    </>
  );
};

export default Tags;
