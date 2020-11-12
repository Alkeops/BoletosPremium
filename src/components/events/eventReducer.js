const {
  CARGAR_EVENTOS,
  CREAR_EVENTO,
  ACTUALIZAR_EVENTO,
  BORRAR_EVENTO,
  AGREGAR_TIPOBOLETO_EVENTO,
  ELIMINAR_TIPOBOLETO_EVENTO,
  AGREGAR_CONTRASENA_STAFF
} = require("./eventConstants");

const initialState = {
  eventos: []
};

const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CARGAR_EVENTOS:
      return { ...state, eventos: payload }; //payload ya es un array no hace falta meterlo dentrod de otro
    case CREAR_EVENTO:
      return { ...state, eventos: [...state.eventos, payload] };
    case ACTUALIZAR_EVENTO:
      return {
        ...state,
        eventos: [
          ...state.eventos.filter((evt) => evt.id !== payload.id),
          payload
        ]
      };
    case BORRAR_EVENTO:
      return {
        ...state,
        eventos: [...state.eventos.filter((evt) => evt.id !== payload)]
      };
    case AGREGAR_TIPOBOLETO_EVENTO:
      return {
        ...state,
        eventos: [
          ...state.eventos.filter((evt) => evt.id !== payload.id),
          payload
        ]
      };
    case AGREGAR_CONTRASENA_STAFF:
      return { ...state };
    case ELIMINAR_TIPOBOLETO_EVENTO:
      return {
        ...state,
        eventos: [
          ...state.eventos.filter((evt) => evt.id !== payload.id),
          payload
        ]
      };
    default:
      return state;
  }
};

export default eventReducer;
