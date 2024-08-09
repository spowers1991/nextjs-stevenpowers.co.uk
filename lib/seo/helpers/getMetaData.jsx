export function getMetaData(story) {
    return {
      title: story?.content?.meta_title || story?.content?.title || 'Steven Powers',
      description: story?.content?.meta_description || 'This is my portfolio site.',
      keywords: story?.content?.meta_keywords || 'Steven Powers, Portfolio, Huddersfield, Web Developer',
      no_index: story?.content?.meta_no_index || 'index, follow',
      url: story?.slug,
      og_image: story?.content?.meta_og_image?.filename || ''
    };
  }
  