import React from 'react';
import Story from './Story';

const StoriesList = ({ stories, minScore, onSubmitArchive }) => {
    const StoryArray = stories.map((story, i) => {
            if (story.score > minScore) 
            return <Story onSubmitArchive={onSubmitArchive} key={stories[i].id} id={stories[i].id} title={stories[i].title} score={stories[i].score} url={stories[i].url} kids={stories[i].kids.length} unix_timestamp={stories[i].time} />
            return null
    });
    return (
        <div>
            {StoryArray}
        </div>

    );
}
export default StoriesList;