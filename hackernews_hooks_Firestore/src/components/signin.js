import React from 'react';
import {signInWithGoogle} from '../firebase/firebase.utils';
import './Gbutton.scss';

const Signin = () => {
    const loginHandle = async (e) => {
        e.preventDefault()
        await signInWithGoogle()
    }
    return (
            <article style={{'marginBottom':'50vh'}} className="br3 ba b--black-10 mv4 w-100 w-50-m w-250-l mw6 shadow-5 center" >
            <main className="pa4 black-80">
                <form className="measure" style={{'display':'flex', 'justifyContent':'center'}}>
                    {/* <button onClick={(e)=>loginHandle(e)}>sign in with google</button> */}
                    <div className="google-btn" onClick={(e)=>loginHandle(e)}>
                        <div className="google-icon-wrapper">
                            <img alt="google btn" className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                        </div>
                        <p className="btn-text"><b>Sign in with google</b></p>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Signin;

// class Signin extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             signInEmail: '',
//             signInPassword: ''
//         }
//     }
//     onEmailChange = (event) => {
//         this.setState({ signInEmail: event.target.value })
//     }
//     onPasswordChange = (event) => {
//         this.setState({ signInPassword: event.target.value })
//     }
//     onSubmitSignIn = (event) => {
//         event.preventDefault();
//         fetch('http://localhost:3000/signin', {
//             method: 'post',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 email: this.state.signInEmail,
//                 password: this.state.signInPassword
//                 })
//             })
//             .then(response => response.json())
//             .then(res => {
//                 if (res.staatus === 'true') {
//                     console.log(res.staatus);
//                     this.props.onRouteChange('signed');
//                 }
//             })
//         // console.log(this.state);
//     }
    
//     render() {
//         return (
            // <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" >
            //     <main className="pa4 black-80">
            //         <form className="measure">
            //             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            //                 <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            //                 <div className="mt3">
            //                     <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            //                     <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
            //                 </div>
            //                 <div className="mv3">
            //                     <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            //                     <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
            //                 </div>
            //             </fieldset>
            //             <div className="">
            //                 <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
            //             </div>
            //         </form>
            //     </main>
            // </article>

//         );
//     }
// }

// export default Signin;