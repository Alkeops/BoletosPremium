import firebase from "./firebase";

export const signInWithEmail = (creds) =>
  firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);

export const signOutFirebase = () => firebase.auth().signOut();
