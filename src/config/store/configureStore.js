import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // devToolsEnhancer permitia la facil configuracion de redux en los navegadores
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { verifyAuth } from "../../components/auth/authActions";

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  store.dispatch(verifyAuth());
  return store;
};

export default configureStore;
