import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
var firebaseApp;
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
    firebaseApp = firebase.app();
}

export const storage = firebaseApp.storage();
export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export default firebaseApp;
