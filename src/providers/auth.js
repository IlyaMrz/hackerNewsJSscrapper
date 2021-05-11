import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.utils';
import Spinner from '../components/spinner/spinner.component';
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ pending, setPending ] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
            console.log('user in auth', user)
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if(pending){
        return <Spinner />
      }

      return (
        <AuthContext.Provider
          value={{
            currentUser
          }}
        >
          {children}
        </AuthContext.Provider>
      );
}

export default AuthProvider;