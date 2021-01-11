import './App.css';
import React, { Component } from 'react';
import StoriesList from './components/StoriesList';

  
class App extends Component {
constructor() {
    super()
    this.state = {
        stories: [],
    }
}

componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`)
        .then(response => response.json())
        .then(data => {
            // const data2 = data.slice(0,60);
            data.forEach(element => { //data2 for slicing
                fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json`)
                .then(response => response.json())
                .then(result => {
                    var joined = this.state.stories.concat(result);
                    this.setState({stories:joined})
                    console.log(result)
                })
            })
        }
    );
    
}





render() {
    const { stories } = this.state;
    return !stories.length ?
        <h1>loading</h1> :
        <div className='tc'>
            <h1>Best hacker news!</h1>
                <StoriesList stories={stories} />
        </div>

    }
}

export default App;