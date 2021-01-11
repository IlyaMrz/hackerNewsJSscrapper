import React from 'react';

const Story = ({ title, score, url }) => {
    return (
        <div className='bg-light-green tc dib br3 pa3 ma2 grow bw2 shadow-3'>
            {/* <img alt='123' src={`https://robohash.org/set_set4/${score}?size=200x200`} /> */}
            <div>
                <h2>{title}</h2>
                <p>Url {url}</p>
                <p>Score: {score}</p>
            </div>
        </div>
    );
}

export default Story;