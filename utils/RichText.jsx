import { render, MARK_UNDERLINE, NODE_PARAGRAPH } from 'storyblok-rich-text-react-renderer';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const RichText = ({ content }) => {
  
  function sanitizeRichText(inputString) {

    const regex = /\((.*?)\)/;
    const match = inputString.match(regex);
    
    return match ? match[1] : null;

  }

  function removeBracketedRichText(inputString) {

    const regex = /^(.*?)\(/;
    const match = inputString.match(regex);

    return match ? match[1] : null;

  }  

  return render(content, {
    markResolvers: {
      [MARK_UNDERLINE]: (children, index) => { return (
      <u>
        <div className='hidden sm:inline-block'>
          <Tooltip id={`richtext-tooltip-${index}`} className='!p-3 !text-sm !bg-[#434bed] !rounded-none !font-[100] !uppercase pb-[10px] sm:pb-[11px] flex items-center gap-x-3 text-[#000]  duration-150 py-[11px] sm:py-[12px] px-5 text-[11px] sm:text-xs !tracking-[1px]' />
        </div>
        {
        children?.includes('(') ?
          <a className="relative sm:hover:opacity-40 sm:hover:cursor-help duration-[0.25s]" data-tooltip-id={`richtext-tooltip-${index}`} data-tooltip-content={sanitizeRichText(children)}>
            {removeBracketedRichText(children)}
            <div className='hidden lg:absolute top-2 right-0 !text-sm rounded-full'>
              ?
            </div>
          </a> 
          :
          children
        }
      </u>
    )}
  },
  nodeResolvers: {
    [NODE_PARAGRAPH]: (content) => {
      return (
        <div>
          {content}
        </div>
      );
    },
  }
})

};

export default RichText;
