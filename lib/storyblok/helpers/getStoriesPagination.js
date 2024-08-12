export function calculateTotalPages(totalStories, storiesPerPage) {
    return Math.ceil(totalStories / storiesPerPage);
}

export function getPaginatedItems(stories, page, storiesPerPage) {
    return stories?.slice((page - 1) * storiesPerPage, page * storiesPerPage);
}
