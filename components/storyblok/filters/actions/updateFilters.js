// Updated updateFilters function using propertyToSearch
export function updateFilters(storiesToFilter, filters, setFilteredStories) {
  const newFilteredStories = storiesToFilter.filter(story => {
    // Check if the story matches all filter criteria
    return Object.keys(filters).every(propertyToSearch => {
      const filterValue = filters[propertyToSearch];
      const storyValue = story[propertyToSearch];
      
      if (Array.isArray(filterValue)) {
        // Filter values are arrays (e.g., tag_list)
        return filterValue.length === 0 || filterValue.every(val => storyValue.includes(val));
      } else if (typeof filterValue === 'string') {
        // Filter values are strings (e.g., name)
        return storyValue.toLowerCase().includes(filterValue.toLowerCase());
      }
      return true;
    });
  });

  // Update the state with the filtered stories
  setFilteredStories(newFilteredStories);
}
