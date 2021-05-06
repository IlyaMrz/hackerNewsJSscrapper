import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from './config';





// Firebase App named ‘[DEFAULT]’ already exists FIX
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;