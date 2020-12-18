import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { Button, Container, Label, List, Segment } from "semantic-ui-react";
import { openModal } from "../common/modals/modalReducer";
import {
  cargarBoletos,
  eliminarTipoBoleto,
  resetInvitados
} from "../guests/guestAction";
import { eliminarBoletoEvento } from "../events/eventActions";
import GoBack from "../common/utilities/GoBack";

const EventDetail = ({ match }) => {
  const dispatch = useDispatch();
  const { eventos } = useSelector((state) => state.evento);
  const [eventoSeleccionado, setEventoSeleccionado] = useState({});
  const { tipoBoleto } = useSelector((state) => state.invitados);
  useEffect(() => {
    const event = eventos.find((evento) => evento.id === match.params.id);
    setEventoSeleccionado(event);
  }, [eventos, match.params.id]);
  useEffect(() => {
    dispatch(cargarBoletos(match.params.id));
    dispatch(resetInvitados());
  }, [dispatch, match.params.id]);
  const url = match.params.id;
  return (
    <>
      <GoBack />
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <h1 style={{ textTransform: "uppercase" }}>
            {eventoSeleccionado.nombre}
            <Label
              style={{ border: "1px solid black", marginLeft: 20 }}
              size="big"
            >
              {eventoSeleccionado.staffID}
            </Label>
          </h1>
        </div>
        <Button
          content="Agregar un tipo de boleto"
          secondary
          onClick={() =>
            dispatch(openModal({ modalType: "BoletoModal", id: url }))
          }
        />
        <Button
          floated="right"
          positive
          content="Crear un PIN para Staff"
          onClick={() =>
            dispatch(openModal({ modalType: "PassStaff", id: url }))
          }
        />
        {tipoBoleto.length ? (
          <Segment inverted>
            <List divided inverted relaxed>
              {tipoBoleto?.map((boleto) => {
                const urlBoleto = boleto.replace(/ /g, "_") || null;
                return (
                  <List.Item key={cuid()}>
                    <List.Content
                      as={Link}
                      to={`${url}/${urlBoleto}`}
                      floated="left"
                      style={{ marginLeft: "20px" }}
                    >
                      <h2>{boleto}</h2>
                    </List.Content>
                    <List.Content floated="right">
                      <Button
                        content="Ver"
                        positive
                        as={Link}
                        to={`${url}/${urlBoleto}`}
                      />
                      <Button
                        negative
                        content="Eliminar"
                        onClick={() => {
                          dispatch(eliminarTipoBoleto(url, boleto));
                          dispatch(eliminarBoletoEvento(url, boleto));
                        }}
                      />
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Segment>
        ) : (
          <h1>Agrega un tipo de Boleto a {eventoSeleccionado.nombre}</h1>
        )}
      </Container>
    </>
  );
};

export default EventDetail;
