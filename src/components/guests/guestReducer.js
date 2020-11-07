import {
  AGREGAR_INVITADO,
  CARGAR_BOLETOS,
  CREAR_BOLETO,
  ELIMINAR_INVITADO,
  ELIMINAR_TIPO_BOLETOS,
  LEER_INVITADOS,
  RESET_INVITADOS,
  RESET_TIPO_BOLETOS
} from "./guestConstants";

const initialState = {
  tipoBoleto: [],
  invitados: []
};

const guestReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_INVITADOS:
      return { ...state, invitados: [] };
    case RESET_TIPO_BOLETOS:
      return { ...state, tipoBoleto: [] };
    case CARGAR_BOLETOS:
      return { ...state, tipoBoleto: payload };
    case CREAR_BOLETO:
      return { ...state, tipoBoleto: [...state.tipoBoleto, payload] };
    case ELIMINAR_TIPO_BOLETOS:
      return {
        ...state,
        tipoBoleto: [...state.tipoBoleto.filter((boleto) => boleto !== payload)]
      };
    case LEER_INVITADOS:
      return { ...state, invitados: [...payload] };
    case AGREGAR_INVITADO:
      return {
        ...state,
        invitados: [...state.invitados, payload]
      };
    case ELIMINAR_INVITADO:
      return { ...state, invitados: payload };
    default:
      return state;
  }
};

export default guestReducer;
