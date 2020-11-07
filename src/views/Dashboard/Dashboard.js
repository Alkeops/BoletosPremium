import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Segment } from "semantic-ui-react";
import { openModal } from "../../components/common/modals/modalReducer";
import { cargarEvento } from "../../components/events/eventActions";
import EventList from "../../components/events/EventList";
import {
  resetBoletos,
  resetInvitados
} from "../../components/guests/guestAction";
// import { crearBoleto } from "../../components/guests/guestAction";
// import { agregarInvitado } from "../../config/firebase/firestoreService";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cargarEvento());
    dispatch(resetBoletos());
    dispatch(resetInvitados());
  }, [dispatch]);

  //dispatch vaciar tipoBoleto, invitados
  const { eventos } = useSelector((state) => state.evento);
  // const { tipoBoleto } = useSelector((state) => state.invitados);
  return (
    <>
      <Container>
        <h1 style={{ textAlign: "center" }}>Eventos</h1>
        <Button
          onClick={() => dispatch(openModal({ modalType: "EventModal" }))}
          content="Agregar un nuevo Evento"
          secondary
        />
        {eventos.length ? (
          <Segment inverted>
            <EventList />
          </Segment>
        ) : (
          <h1>Agrega tu primer evento</h1>
        )}
      </Container>
      {/*
       *       {eventos.map((evento) => (
       *         <>
       *           <h1>{evento.nombre}</h1>
       *           {evento.tipoBoleto &&
       *             evento.tipoBoleto.map((boleto) => (
       *               <button onClick={() => agregarInvitado(boleto, "gimena")}>
       *                 {boleto}
       *               </button>
       *             ))}
       *         </>
       *       ))}
       *       <button onClick={() => dispatch(crearBoleto("verdelado"))}>Click</button>
       *
       *       {tipoBoleto.map((boleto) => (
       *         <h1> {boleto} </h1>
       *       ))}
       */}
    </>
  );
};

export default Dashboard;
