import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firebase from "../../config/firebase/firebase";

export const signInUser = (user) => ({ type: SIGN_IN_USER, payload: user });

export const verifyAuth = () => (dispatch) =>
  firebase.auth().onAuthStateChanged((user) => {
    //TODO sistema autenticacion anonima para los que van a leer los pases de entrada
    if (user) {
      dispatch(signInUser(user));
    } else {
      dispatch(signOutUser());
    }
  });

//export const staffAuth = () => (dispatch) =>
// firebase.auth().signInAnonymously()

export const signOutUser = () => ({ type: SIGN_OUT_USER });
