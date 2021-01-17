import './App.css';
import React, { Component } from 'react';
import StoriesList from './components/StoriesList';
import Signin from './components/signin';
import Hat from './components/Hat';

const initialState = {
    route: 'signin',
  }
  
class App extends Component {
    constructor() {
        super()
        this.state = {
            stories: [],
            storiesRaw: [],
            storiesDB: [],
            stroiesToDisplay: [],
            route: 'signin',
            isSignedIn: false,
        }
    }

    componentDidMount() {
        fetch(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`)
            .then(response => response.json())
            .then(data => {
                const data2 = data.slice(0,70); // comment for data
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
                        const array2 = this.state.storiesDB;
                        array2.forEach(element2 => {
                            array1.forEach(element1 => {
                                if(element1 == element2){
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

    onRouteChange = (route) => {
        if (route === 'signin') {
          this.setState(initialState)
        } 
        this.setState({ route: route });
      }


    render() {
        const { stories, route } = this.state;
        return (
                <div>
                    {route === 'signin'?
                        <Signin  onRouteChange={this.onRouteChange} />
                    :route === 'signed'?
                        !stories.length ?
                        <div>
                            <h1>loading</h1>
                            <Hat onRouteChange={this.onRouteChange}/>
                        </div> :
                        <div className='tc'>
                                <Hat onRouteChange={this.onRouteChange}/>
                                <h1>Best hacker news!</h1>
                                <StoriesList stories={stories} submitArchive={this.onSubmitArchive}/>
                        </div>
                        :<div>123</div>
                    }
                </div>
        )
        }
}

export default App;