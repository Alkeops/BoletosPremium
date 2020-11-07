const { SIGN_IN_USER, SIGN_OUT_USER } = require("./authConstants");

const initialState = {
  auth: false,
  currentUser: null
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        auth: true,
        currentUser: {
          email: payload.email,
          uid: payload.uid
        } //TODO se puede agregar cualquier cosa que defina al usuario, agregar despues
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export default authReducer;
