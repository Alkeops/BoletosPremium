import cuid from "cuid";
import {
  cargarEventos,
  crearNuevoEvento,
  eliminarEvento,
  eliminarTodosLosDoc
} from "../../config/firebase/firestoreService";
import {
  ACTUALIZAR_EVENTO,
  BORRAR_EVENTO,
  CREAR_EVENTO,
  CARGAR_EVENTOS,
  AGREGAR_TIPOBOLETO_EVENTO,
  ELIMINAR_TIPOBOLETO_EVENTO
} from "./eventConstants";

export const cargarEvento = () => async (dispatch) => {
  const eventos = await cargarEventos();
  dispatch({
    type: CARGAR_EVENTOS,
    payload: eventos
  });
};

export const crearEvento = (evento) => (dispatch) => {
  const id = cuid();
  crearNuevoEvento(id, evento);
  dispatch({
    type: CREAR_EVENTO,
    payload: { ...evento, id: id, tipoBoleto: [] }
  });
};

export const actualizarEvento = (evento) => ({
  type: ACTUALIZAR_EVENTO,
  payload: evento
});

export const borrarEvento = (eventoId) => async (dispatch, getState) => {
  const { tipoBoleto } = getState().evento.eventos.find(
    (evento) => evento.id === eventoId
  );
  await tipoBoleto.map((boleto) => eliminarTodosLosDoc(eventoId, boleto));
  await eliminarEvento(eventoId);
  dispatch({
    type: BORRAR_EVENTO,
    payload: eventoId
  });
};

export const agregarTipoBoleto = (eventoId, { nombre }) => (
  dispatch,
  getState
) => {
  let evento = getState().evento.eventos.find(
    (evento) => evento.id === eventoId
  );
  evento = { ...evento, tipoBoleto: [...evento.tipoBoleto, nombre] };
  dispatch({
    type: AGREGAR_TIPOBOLETO_EVENTO,
    payload: evento
  });
};

export const eliminarBoletoEvento = (eventoId, boleto) => (
  dispatch,
  getState
) => {
  let evento = getState().evento.eventos.find(
    (evento) => evento.id === eventoId
  );
  evento = {
    ...evento,
    tipoBoleto: evento.tipoBoleto.filter(
      (boletoNombre) => boletoNombre !== boleto
    )
  };

  dispatch({
    type: ELIMINAR_TIPOBOLETO_EVENTO,
    payload: evento
  });
};
