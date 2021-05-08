import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import StoriesList from './components/StoriesList';
import Signin from './components/signin';
import Hat from './components/Hat';
import axios from 'axios';
import {AuthContext} from './providers/auth';
import { getNewsFirestoreRef } from './firebase/firebase.utils';



const App = () => {
    const [stories, setStories] = useState([]);
    const [archived, setArchived] = useState([]);
    const [minScore, setMinScore] = useState(400);
    const [amount, setAmount] = useState(10);
    const { currentUser } = useContext(AuthContext);

    useEffect(()=>{
        const getArchivedFromFirestore = async (currentUser) =>{
            if (!currentUser) return setArchived([])
            const newsRef = await getNewsFirestoreRef(currentUser.uid)
            const snapshotNews = await newsRef.get()

            // console.log('snapshotNews.data().archived', snapshotNews.data().archived)

            const updatedStories = stories.filter(story => !snapshotNews.data().archived.includes(story.id))
            setStories(updatedStories)
            setArchived(snapshotNews.data().archived)
        }
        getArchivedFromFirestore(currentUser)
    },[currentUser])

    useEffect(()=>{
        // console.log('archived stories effect', archived)
        const archivedToFirestore = async (currentUser) =>{
            if (!currentUser) return null
            const newsRef = await getNewsFirestoreRef(currentUser.uid)

            await newsRef.set({archived})
        }
        archivedToFirestore(currentUser)

    },[archived,currentUser])

    useEffect(()=>{
        const fetchTop = async () =>{
            console.log('use effect')
            setStories([])
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

    const onSubmitArchive = (id) => {
        const updatedStories = stories.filter(story => story.id !== id)
        setArchived(archived => [...archived, id])
        setStories(updatedStories)
    }


    if (currentUser) {
        return (
                <div className='tc'>
                        <Hat />
                        <h1>Best hacker news!</h1>
                        <div> 
                            <span>min score now: {minScore} </span>
                            <input placeholder="min score" type="number" min='0' onChange={(e) => setMinScore(e.target.value)}/>
                            <input placeholder="amount" type="range" min='1' max='200' onChange={(e) => setAmount(e.target.value)}/>
                            {amount} <span> - amount of news filtered</span>
                        </div>
                        <StoriesList stories={stories.slice(0,amount)} minScore={minScore} onSubmitArchive={onSubmitArchive}/>
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