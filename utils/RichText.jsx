import { render,NODE_PARAGRAPH } from 'storyblok-rich-text-react-renderer';

const RichText = ({ content }) => {
  return render(content, {
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
