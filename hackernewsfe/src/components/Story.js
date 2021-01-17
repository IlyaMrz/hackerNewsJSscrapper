import React from 'react';

const Story = ({ title, score, url, id, kids, unix_timestamp, submitArchive}) => {
    let url2 = "https://news.ycombinator.com/item?id="
    function convertTimestamp(timestamp) {
        var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
              yyyy = d.getFullYear(),
              mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
              dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
              hh = d.getHours(),
              h = hh,
              min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
              ampm = 'AM',
              time;  
          if (hh > 12) {
              h = hh - 12;
              ampm = 'PM';
          } else if (hh === 12) {
              h = 12;
              ampm = 'PM';
          } else if (hh === 0) {
              h = 12;
          }
          // ie: 2013-02-18, 8:35 AM	
          //   time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
          time = dd + '-' + mm + '-' + yyyy + ' __ ' + h + ':' + min + ' ' + ampm;
          return time;
      }

    let time = convertTimestamp(unix_timestamp);

    return (
        <article className="center mw5 mw7-ns hidden ba mv3 shadow-3 tc">
            <div className="f4 bg-light-green ma0 pv0 ph0 fl w-100 pa2 bb flex items-center">
              <h1 className="f4 bg-light-green ma0 pa2 fl w-90 pv2 br">{title}</h1>
              <a className="f4 bg-light-green ma0 ph1 pa2 fl w-10 center v-mid link dim navy" href="#" onClick={submitArchive.bind(this,id)}>Archive</a>
            </div>
            <div className="pa1 bt pb0">
              <a className='fl w-100' target="_blank" rel="noopener noreferrer" href={url2+id}>{url2+id}</a>
              <h3 className='mv1'> {kids} comments</h3>
              <a className='mv1' target="_blank" rel="noopener noreferrer" href={url}>{url}</a>
              <h3 className='mv1'>Score: {score}</h3>
              <p className='mv1'>Publication date: {time}</p>
            </div>
        </article>
    );
}

export default Story;