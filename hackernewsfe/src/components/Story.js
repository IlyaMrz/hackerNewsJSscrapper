import React from 'react';

const Story = ({ title, score, url, id, kids, unix_timestamp}) => {
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
        // <div className='bg-light-green tc dib br3 pa3 ma2 grow bw2 shadow-3'>
        //     {/* <img alt='123' src={`https://robohash.org/set_set4/${score}?size=200x200`} /> */}
        //     <div className='tc fl w-100'>
        //         <h2>{title}</h2>
        //         <a className='fl w-100' target="_blank" rel="noopener noreferrer" href={url2+id}>{url2+id}</a>
        //         <h3> {kids} comments</h3>
        //         <a target="_blank" rel="noopener noreferrer" href={url}>{url}</a>
        //         <p>Score: {score}</p>
        //     </div>
        // </div>
        <article class="center mw5 mw6-ns hidden ba mv4">
            <h1 class="f4 bg-light-green mv0 pv2 ph1">{title}</h1>
            <div class="pa3 bt">
            <a className='fl w-100' target="_blank" rel="noopener noreferrer" href={url2+id}>{url2+id}</a>
              <h3> {kids} comments</h3>
              <a target="_blank" rel="noopener noreferrer" href={url}>{url}</a>
              <p>Score: {score}</p>
              <p>Date: {time}</p>
            </div>
        </article>
    );
}

export default Story;