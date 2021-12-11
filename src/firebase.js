// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/auth"
import "firebase/firestore" 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrnQ62fNQiTGkSMBYCKY_sQiZa1VNpTOU",
  authDomain: "click-sign-up-2c459.firebaseapp.com",
  projectId: "click-sign-up-2c459",
  storageBucket: "click-sign-up-2c459.appspot.com",
  messagingSenderId: "600840350903",
  appId: "1:600840350903:web:1a445dc6c748095bb77132",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
let fireStore = firebase.firestore()

export {auth, fireStore, firebase}