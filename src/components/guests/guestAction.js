import cuid from "cuid";
import {
  agregarInvitado,
  crearNuevoBoleto,
  eliminarInvitado,
  eliminarTodosLosDoc,
  leerListaInvitados
} from "../../config/firebase/firestoreService";
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

export const resetBoletos = () => ({ type: RESET_TIPO_BOLETOS });
export const resetInvitados = () => ({ type: RESET_INVITADOS });

export const cargarBoletos = (id) => (dispatch, getState) => {
  const boletos = getState().evento.eventos.find((boleto) => boleto.id === id)
    .tipoBoleto;
  dispatch({
    type: CARGAR_BOLETOS,
    payload: boletos
  });
};

export const crearBoleto = (id, { nombre }) => (dispatch) => {
  crearNuevoBoleto(id, nombre);
  dispatch({
    type: CREAR_BOLETO,
    payload: nombre
  });
};

export const eliminarTipoBoleto = (eventoId, tipoBoleto) => async (
  dispatch
) => {
  await eliminarTodosLosDoc(eventoId, tipoBoleto);
  dispatch({
    type: ELIMINAR_TIPO_BOLETOS,
    payload: tipoBoleto
  });
};

export const cargarListaInvitados = (id, tipoBoleto) => async (dispatch) => {
  const docs = await leerListaInvitados(id, tipoBoleto);
  dispatch({
    type: LEER_INVITADOS,
    payload: docs
  });
};

export const agregarNuevoInvitado = (id, tipoBoleto, datos) => (dispatch) => {
  const docId = cuid();
  agregarInvitado(id, tipoBoleto, datos, docId);
  dispatch({
    type: AGREGAR_INVITADO,
    payload: { ...datos, id: docId }
  });
};

export const eliminarInvitados = (idDoc, tipoBoleto, ids) => (
  dispatch,
  getState
) => {
  let invitados = getState().invitados.invitados;
  ids.map((id) => {
    eliminarInvitado(idDoc, tipoBoleto, id);
    invitados = invitados.filter((invitado) => invitado.id !== id);
    return invitados;
  });
  dispatch({
    type: ELIMINAR_INVITADO,
    payload: invitados
  });
};
