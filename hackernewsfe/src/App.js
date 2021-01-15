import './App.css';
import React, { Component } from 'react';
import StoriesList from './components/StoriesList';

  
class App extends Component {
constructor() {
    super()
    this.state = {
        stories: [],
        storiesRaw: [],
        storiesDB: [],
        stroiesToDisplay: []
    }
}

// componentDidMount() {
//     fetch(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`)
//         .then(response => response.json())
//         .then(data => {
//             const data2 = data.slice(0,40); // comment for data
//             data2.forEach(element => { //data2 for slicing. data for full
//                 fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json`)
//                 .then(response => response.json())
//                 .then(result => {
//                     var joined = this.state.storiesRaw.concat(result);
//                     this.setState({storiesRaw:joined})
//                     // console.log(result.length)    
//                 })
//             })
//             fetch('http://localhost:3000/')
//                         .then(response => response.json())
//                         .then(data =>{
//                             data.forEach(elem => {
//                                 console.log(elem.id);
//                                 const loadedStories = this.state.storiesRaw;
//                                 const storiesWithoutDB = loadedStories.filter( item => item.id !== elem.id);
//                                 this.setState({stories:storiesWithoutDB})
//                             })
//                         })
//             // 
//             // const storiesWithoutDB = loadedStories.filter( item => item.id != elem.id)
            
//         }
//     );
    
// }

componentDidMount() {
    fetch(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`)
        .then(response => response.json())
        .then(data => {
            const data2 = data.slice(0,40); // comment for data
            this.setState({storiesRaw:data2})
            })
            fetch('http://localhost:3000/')
                .then(response => response.json())
                .then(data =>{
                    data.forEach(element => {
                        var eleID = this.state.storiesDB.concat(element.id);
                        this.setState({storiesDB:eleID});
                    });
                    const array1 = this.state.storiesRaw;
                    // console.log(`1 ${array1} type ${typeof(array1)}`);
                    const array2 = this.state.storiesDB;
                    // console.log(`2 ${array2}`);
                    array2.forEach(element2 => {
                        array1.forEach(element1 => {
                            if(element1 == element2){
                                // console.log(`found ${element} index>> ${array1.indexOf(element)}`);
                                array1.splice(array1.indexOf(element1),1)
                            } 
                        })
                    })
                    array1.forEach(element =>{
                            fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json`)
                            .then(response => response.json())
                            .then(result => {
                                var joined = this.state.stories.concat(result);
                                this.setState({stories:joined})
                            })
                    })
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