import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";
import firebase from "../../config/firebase/firebase";

export const signInUser = (user) => ({ type: SIGN_IN_USER, payload: user });

export const verifyAuth = () => (dispatch) =>
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(signInUser(user));
    } else {
      dispatch(signOutUser());
    }
  });

export const signOutUser = () => ({ type: SIGN_OUT_USER });
