import React from 'react';
import { auth } from '../firebase/firebase.utils';

const Hat = () =>(
            <div className="w-60-ns-l-m mw98 flex flex-row justify-between">
                    <div className="flex-auto ml5-ns">
                        <h1 className="f3 f2-ns pa0">Best hacker news!</h1>
                    </div>
                    <div style={{'marginTop':'0.6rem'}}>
                        <a href='/#' style={{'whiteSpace':'nowrap'}} className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green grow shadow-3" 
                        onClick={()=>auth.signOut()} > Log Out</a>
                    </div>
            </div>
        );


export default Hat;