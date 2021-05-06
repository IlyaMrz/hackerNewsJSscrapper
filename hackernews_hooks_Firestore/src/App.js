import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import StoriesList from './components/StoriesList';
import Signin from './components/signin';
import Hat from './components/Hat';
import axios from 'axios';
import {AuthContext} from './providers/auth';



const App = () => {
    const [stories, setStories] = useState([]);
    const [minScore, setMinScore] = useState(100);
    const [amount, setAmount] = useState(5);
    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        const fetchTop = async () =>{
            let idsStories = await axios('https://hacker-news.firebaseio.com/v0/beststories.json');
            idsStories = idsStories.data;
            idsStories.forEach(el => {
                let Fstory = async () =>{ 
                    let story = await axios(`https://hacker-news.firebaseio.com/v0/item/${el}.json`)
                        setStories(stories => [...stories, story.data].sort((a,b)=>b.score - a.score))
                    }
                Fstory()
            }
            );
        }
    fetchTop()
    },[])

    if (currentUser) {
        return (
                <div className='tc'>
                        <Hat />
                        <h1>Best hacker news!</h1>
                        <div> 
                            <span>min score:  </span>
                            <input placeholder="min score 100 default" type="number" min='0' onChange={(e) => setMinScore(e.target.value)}/>
                            <input placeholder="amount" type="range" min='1' max='200' onChange={(e) => setAmount(e.target.value)}/>
                            {amount} <span> - amount of news filtered</span>
                        </div>
                        <StoriesList stories={stories.slice(0,amount)} minScore={minScore}/>
                </div>
        )
    }

    return <Signin />
}


export default App;















// const initialState = {
//     route: 'signin',
//   }
  
// class App extends Component {
//     constructor() {
//         super()
//         this.state = {
//             stories: [],
//             storiesRaw: [],
//             storiesDB: [],
//             stroiesToDisplay: [],
//             route: 'signin',
//             isSignedIn: false,
//         }
//     }

//     componentDidMount() {
//         fetch(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`)
//             .then(response => response.json())
//             .then(data => {
//                 const data2 = data.slice(0,70); // comment for data
//                 this.setState({storiesRaw:data2})
//                 })
//                 fetch('http://localhost:3000/')
//                     .then(response => response.json())
//                     .then(data =>{
//                         data.forEach(element => {
//                             var eleID = this.state.storiesDB.concat(element.id);
//                             this.setState({storiesDB:eleID});
//                         });
//                         const array1 = this.state.storiesRaw;
//                         const array2 = this.state.storiesDB;
//                         array2.forEach(element2 => {
//                             array1.forEach(element1 => {
//                                 if(element1 == element2){
//                                     array1.splice(array1.indexOf(element1),1)
//                                 } 
//                             })
//                         })
//                         array1.forEach(element =>{
//                                 fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json`)
//                                 .then(response => response.json())
//                                 .then(result => {
//                                     var joined = this.state.stories.concat(result);
//                                     this.setState({stories:joined})
//                                 })
//                         })
//             }
//         );
//     }



//     onSubmitArchive = (id, event) => {
//         const currentStories = this.state.stories;
//         const updatedStories = currentStories.filter(item =>item.id !== id);
//         this.setState({stories:updatedStories});
//         fetch('http://localhost:3000/archive', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 id:id
//             })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//         })
//     };

//     onRouteChange = (route) => {
//         if (route === 'signin') {
//           this.setState(initialState)
//         } 
//         this.setState({ route: route });
//       }


//     render() {
//         const { stories, route } = this.state;
//         return (
//                 <div>
//                     {
//                     route === 'signin'?
//                         <Signin  onRouteChange={this.onRouteChange} />
//                     :route === 'signed'?
//                         !stories.length ?
//                         <div>
//                             <h1>loading</h1>
//                             <Hat onRouteChange={this.onRouteChange}/>
//                         </div> :
//                         <div className='tc'>
//                                 <Hat onRouteChange={this.onRouteChange}/>
//                                 <h1>Best hacker news!</h1>
//                                 <StoriesList stories={stories} submitArchive={this.onSubmitArchive}/>
//                         </div>
//                         :<div>123</div>
//                     }
//                 </div>
//         )
//     }
// }

// export default App;