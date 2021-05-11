import React from 'react';
import { auth } from '../firebase/firebase.utils';

const Hat = () =>(
            <div style={{"minWidth":"90vw"}}>
                <div className="fl w-80 pa2"></div>
                <div className="fl w-20 pa2" >
                    <a href='/#' style={{'whiteSpace':'nowrap'}} className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green grow shadow-3" 
                    onClick={()=>auth.signOut()} > Log Out</a>
                </div>
            </div>
        );


export default Hat;