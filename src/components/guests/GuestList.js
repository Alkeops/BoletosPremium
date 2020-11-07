import cuid from "cuid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Container,
  Icon,
  Segment,
  Table
} from "semantic-ui-react";
import { cargarListaInvitados, eliminarInvitados } from "./guestAction";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import QRCode from "qrcode.react";
import { openModal } from "../common/modals/modalReducer";
import GoBack from "../common/utilities/GoBack";

const GuestList = ({ match }) => {
  const [editar, setEditar] = useState({
    over: false,
    id: "",
    click: false,
    checked: false
  });

  const [idSelect, setIdSelect] = useState([]);

  const dispatch = useDispatch();

  let { id, boleto } = match.params;
  let idDoc = id;

  boleto = boleto.replace(/_/g, " ");

  useEffect(() => {
    dispatch(cargarListaInvitados(id, boleto));
  }, [dispatch, id, boleto]);

  const { invitados } = useSelector((state) => state.invitados);

  const handleSelection = (id) => {
    let nuevoArray = [...idSelect];
    let index = nuevoArray.indexOf(id);
    if (index !== -1) {
      nuevoArray.splice(index, 1);
      setIdSelect(nuevoArray);
      return;
    } else {
      setIdSelect([...idSelect, id]);
    }
  };

  const handleSelectionAll = () => {
    if (idSelect.length === invitados.length) {
      setIdSelect([]);
      return;
    }
    let ids = [];
    invitados.map((invitado) => ids.push(invitado.id));
    setIdSelect(ids);
  };
  return (
    <>
      <GoBack />
      <Container>
        <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
          {boleto}
        </h1>
        {invitados.length ? (
          <>
            <ReactHTMLTableToExcel
              id="button"
              className="ui secondary button"
              table="tablaInvitado"
              filename="invitados"
              sheet="invitados"
              buttonText="Descarga excell"
            />
            <Button
              content="Imprimir"
              id="buttonImprimir"
              className="ui secondary button"
              onClick={() => window.print()}
            />
          </>
        ) : null}
        <Button
          content="Agregar un nuevo Invitado"
          id="buttonNuevoInvitado"
          secondary
          onClick={() => {
            dispatch(openModal({ modalType: "GuestModal", id, boleto }));
          }}
        />
        {idSelect.length > 0 && (
          <>
            <Button
              negative
              content="Eliminar"
              onClick={() => {
                dispatch(eliminarInvitados(idDoc, boleto, idSelect));
                setIdSelect([]);
              }}
            />
            {idSelect.length < 2 && <Button content="Editar" positive />}
          </>
        )}
        {invitados.length ? (
          <Segment>
            <Table inverted id="tablaInvitado">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">
                    <Checkbox
                      checked={
                        idSelect.length === invitados.length &&
                        invitados.length !== 0
                      }
                      onChange={() => handleSelectionAll()}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>Nombre</Table.HeaderCell>
                  <Table.HeaderCell>Telefono</Table.HeaderCell>
                  <Table.HeaderCell>Correo</Table.HeaderCell>
                  <Table.HeaderCell>QR</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {invitados?.map(({ nombre, id, telefono, correo }) => (
                  <Table.Row
                    className="tabla-fila"
                    key={cuid()}
                    onMouseEnter={() =>
                      setEditar({ ...editar, over: true, id })
                    }
                    onMouseLeave={() =>
                      setEditar({ ...editar, over: false, id: "" })
                    }
                    error={idSelect.includes(id)}
                  >
                    <Table.Cell textAlign="center" width={1}>
                      {(editar.over && editar.id === id) ||
                      idSelect.length > 0 ? (
                        <>
                          <Checkbox
                            checked={idSelect.includes(id)}
                            onChange={() => handleSelection(id)}
                          />
                        </>
                      ) : (
                        <Icon name="user" />
                      )}
                    </Table.Cell>
                    <Table.Cell width={5}>
                      <h3>{nombre}</h3>
                      {editar.over &&
                        editar.id === id &&
                        idSelect.length === 0 && (
                          <div
                            className="iconos"
                            style={{
                              marginTop: "10px",
                              background: "#333333",
                              padding: "5px"
                            }}
                          >
                            <Icon
                              size="large"
                              name="trash alternate outline"
                              onClick={() =>
                                dispatch(eliminarInvitados(idDoc, boleto, [id]))
                              }
                            />
                            <Icon size="large" name="edit outline" />
                          </div>
                        )}
                    </Table.Cell>
                    <Table.Cell width={3}>
                      <h3>{telefono}</h3>
                    </Table.Cell>
                    <Table.Cell width={3}>
                      <h3>{correo}</h3>
                    </Table.Cell>
                    <Table.Cell width={4} collapsing textAlign="center">
                      <QRCode
                        renderAs="svg"
                        value={id}
                        includeMargin={true}
                        size={140}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Segment>
        ) : (
          <h1>Aun no has agregado invitados a {boleto}</h1>
        )}
      </Container>
    </>
  );
};

export default GuestList;
