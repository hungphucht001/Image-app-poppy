import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/storage";
import "firebase/compat/analytics"

const firebaseConfig = {
    apiKey: "AIzaSyBKPH3yQh2kl1kMTGpDjUAO3P3eJA1Czyo",
    authDomain: "image-app-71eee.firebaseapp.com",
    projectId: "image-app-71eee",
    storageBucket: "image-app-71eee.appspot.com",
    messagingSenderId: "631476846814",
    appId: "1:631476846814:web:a77abe482d8d3b2c38424f",
    measurementId: "G-VT7HNH6H2J"
  };


firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();

export {storage, auth, db, firebase as default};