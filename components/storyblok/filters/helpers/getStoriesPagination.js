export function calculateTotalPages(totalStories, storiesPerPage) {
    return Math.ceil(totalStories / storiesPerPage);
}

export function getPaginatedItems(storiesToFilter, page, storiesPerPage) {
    return storiesToFilter?.slice((page - 1) * storiesPerPage, page * storiesPerPage);
}
