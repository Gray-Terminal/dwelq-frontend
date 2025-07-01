// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_uzexUBwoKym0TDBTNwB5WQrZRwP1SVk",
  authDomain: "dwelq-69ffe.firebaseapp.com",
  projectId: "dwelq-69ffe",
  storageBucket: "dwelq-69ffe.firebasestorage.app",
  messagingSenderId: "163354788608",
  appId: "1:163354788608:web:0dd8ae462eb12013db69e5",
  measurementId: "G-33XXFYCZQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };