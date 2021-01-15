import './App.css';
import React, { Component } from 'react';
import StoriesList from './components/StoriesList';

  
class App extends Component {
constructor() {
    super()
    this.state = {
        stories: [],
        storiesDB: [],
        stroiesToDisplay: []
    }
}

componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`)
        .then(response => response.json())
        .then(data => {
            const data2 = data.slice(0,40); // comment for data
            data2.forEach(element => { //data2 for slicing. data for full
                fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json`)
                .then(response => response.json())
                .then(result => {
                    var joined = this.state.stories.concat(result);
                    this.setState({stories:joined})
                    // console.log(result)    
                })
            })
            fetch('http://localhost:3000/')
                        .then(response => response.json())
                        .then(data =>{
                            data.forEach(elem => {
                                console.log(elem.id);
                                const loadedStories = this.state.stories;
                                const storiesWithoutDB = loadedStories.filter( item => item.id != elem.id);
                                this.setState({stories:storiesWithoutDB})
                            })
                        })
            // 
            // const storiesWithoutDB = loadedStories.filter( item => item.id != elem.id)
            
        }
    );
    
}

onSubmitArchive = (id, event) => {
    const currentStories = this.state.stories;
    const updatedStories = currentStories.filter(item =>item.id !== id);
    this.setState({stories:updatedStories});
    fetch('http://localhost:3000/archive', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id:id
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
};



render() {
    const { stories } = this.state;
    return !stories.length ?
        <h1>loading</h1> :
        <div className='tc'>
            <h1>Best hacker news!</h1>
                <StoriesList stories={stories} submitArchive={this.onSubmitArchive} />
        </div>

    }
}

export default App;