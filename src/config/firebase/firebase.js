import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQwCs2nLoMVGsZ5egTdD4FKOOWWQrEpvo",
  authDomain: "ticket-app-7cf7e.firebaseapp.com",
  databaseURL: "https://ticket-app-7cf7e.firebaseio.com",
  projectId: "ticket-app-7cf7e",
  storageBucket: "ticket-app-7cf7e.appspot.com",
  messagingSenderId: "623471758397",
  appId: "1:623471758397:web:41c95644b9b1ce65fc6e54"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
