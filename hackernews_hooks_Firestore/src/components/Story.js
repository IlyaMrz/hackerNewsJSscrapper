import React from 'react';
import convertTimestamp from './convertUnixTime';

const Story = ({ title, score, url, id, kids, unix_timestamp, onSubmitArchive}) => {
    let url2 = "https://news.ycombinator.com/item?id=";
    let time = convertTimestamp(unix_timestamp);

    return (
        <article className="center mw98 mw7-ns hidden ba mv3 shadow-3 tc">
            <div className="f4 bg-light-green ma0 pv0 ph0 fl w-100 pa2 bb flex items-center">
              <h1 className="f4 bg-light-green ma0 pa0 fl w-90 pv2 br">{title}</h1>
              <a onClick={()=>onSubmitArchive(id)} className="f4-ns v-mid f7 bg-light-green ma0 ph1 pa0 fl w-10 link dim navy ma0" href="/#" >Archive</a>
            </div>
            <div className="pa1 pv0">
              <a target="_blank" rel="noopener noreferrer" href={url2+id}>{url2+id}</a>
              <h3 className='mv1'> {kids} comments</h3>
              <a target="_blank" rel="noopener noreferrer" href={url}>{url}</a>
              <h3 className='mv1'>Score: {score}</h3>
              <p className='mv1'>Publication date: {time}</p>
            </div>
        </article>
    );
}

export default Story;