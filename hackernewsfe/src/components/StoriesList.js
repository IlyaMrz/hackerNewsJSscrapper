import React from 'react';
import Story from './Story';

const StoriesList = ({ stories }) => {
    const StoryArray = stories.map((user, i) => {
        return <Story key={stories[i].id} id={stories[i].id} title={stories[i].title} score={stories[i].score} url={stories[i].url} kids={stories[i].kids.length} unix_timestamp={stories[i].time} />
    });
    return (
        <div>
            {StoryArray}
        </div>

    );
}
export default StoriesList;