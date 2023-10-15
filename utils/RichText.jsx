import { render } from 'storyblok-rich-text-react-renderer';

const RichText = ({ content }) => {

  const parsedRichText = render(content);

  return parsedRichText;
};

export default RichText;
