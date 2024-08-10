const getStoriesTags = (stories) => {
    if (Array.isArray(stories)) {
        return stories.map(story => {
            const blok = story?.content?.body?.find(blok => blok.component === 'heading_with_cta');
            const tags = blok?.tags;
            return Array.isArray(tags) ? tags : tags ? [tags] : [];
        });
    } else if (stories && typeof stories === 'object') {
        const blok = stories?.content?.body?.find(blok => blok.component === 'heading_with_cta');
        const tags = blok?.tags;
        return Array.isArray(tags) ? tags : tags ? [tags] : [];
    } else {
        return [];
    }
};

export default getStoriesTags;
