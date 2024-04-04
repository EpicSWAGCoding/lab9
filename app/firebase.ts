// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBEUfJBpi9Y6Jpybl217B6Iin9AORFT6sI",
    authDomain: "mysmallpetproject.firebaseapp.com",
    databaseURL: "https://mysmallpetproject-default-rtdb.firebaseio.com",
    projectId: "mysmallpetproject",
    storageBucket: "mysmallpetproject.appspot.com",
    messagingSenderId: "322283072810",
    appId: "1:322283072810:web:a92f9b922d865870c84253",
    measurementId: "G-L7EHPC7CJY"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const analytics = getAnalytics(FIREBASE_APP);

// Initialize Firebase Authentication and get a reference to the service
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)