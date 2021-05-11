import React from 'react';
import { auth } from '../firebase/firebase.utils';

const Hat = () =>(
            <div style={{"minWidth":"90vw"}}>
                <div className="fl w-70 pa2">
                    <h1 className="ma0 ml3-ns f4 f2-ns">Best hacker news!</h1>
                </div>
                <div className="fl w-30 pa2" >
                    <a href='/#' style={{'whiteSpace':'nowrap'}} className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green grow shadow-3" 
                    onClick={()=>auth.signOut()} > Log Out</a>
                </div>
            </div>
        );


export default Hat;