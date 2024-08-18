import React from 'react';
import Card from '@/components/storyblok/filters/Card';

const FilteredStories = ({ stories, page }) => {


  return (
    <>
        {stories?.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {stories?.slice((page - 1) * 6, page * 6).map((story, index) => (
                <Card key={story.uuid} index={index} story={story} />
            ))}
            </div>
        :
            <div className="text-center text-lg">
            No project available for these filters...
            </div>
        }
    </>
  );
};

export default FilteredStories;
