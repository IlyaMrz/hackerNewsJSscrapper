import React from 'react';
import Story from './Story';

const StoriesList = ({ stories }) => {
    const StoryArray = stories.map((user, i) => {
        return <Story key={stories[i].id} title={stories[i].title} score={stories[i].score} url={stories[i].url} />
    });
    return (
        <div>
            {StoryArray}
        </div>

    );
}
export default StoriesList;