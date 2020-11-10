const CARGAR_EVENTO_STAFF = "CARGAR_EVENTO_STAFF";

export const cargarEventoStaff = (evento) => (dispatch) => {
  dispatch({
    type: CARGAR_EVENTO_STAFF,
    payload: evento
  });
};

const initialState = { evento: {} };

const staffReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CARGAR_EVENTO_STAFF:
      return { ...state, evento: payload };
    default:
      return state;
  }
};

export default staffReducer;
