const CARGAR_EVENTO_STAFF = "CARGAR_EVENTO_STAFF";
const CARGAR_INVITADOS_STAFF = "CARGAR_INVITADOS_STAFF";

export const cargarEventoStaff = (evento) => (dispatch) => {
  dispatch({
    type: CARGAR_EVENTO_STAFF,
    payload: evento
  });
};

export const cargarInvitadosStaff = (invitados) => (dispatch) => {
  dispatch({
    type: CARGAR_INVITADOS_STAFF,
    payload: invitados
  });
};

const initialState = { evento: {} };

const staffReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CARGAR_EVENTO_STAFF:
      return { ...state, evento: payload };
    case CARGAR_INVITADOS_STAFF:
      return {
        ...state,
        invitados: {
          ...state.invitados,
          [payload.nombre]: [payload.asistentes]
        }
      };
    default:
      return state;
  }
};

export default staffReducer;
