import { combineReducers } from "redux";
import authReducer from "../../components/auth/authReducer";
import modalReducer from "../../components/common/modals/modalReducer";
import eventReducer from "../../components/events/eventReducer";
import guestReducer from "../../components/guests/guestReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  evento: eventReducer,
  invitados: guestReducer,
  modals: modalReducer //Agregar los reducers aqui ejemplo test: textReducer, bla bla
});

export default rootReducer;
