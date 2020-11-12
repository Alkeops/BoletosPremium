import React, { useEffect, useState } from "react";
import { Button, Icon, List, Segment } from "semantic-ui-react";
import { db } from "../../config/firebase/firestoreService";

const StaffList = ({ boleto, idEvento }) => {
  const [invitados, setInvitados] = useState([]);
  const [marcar, setMarcar] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  useEffect(() => {
    db.collection("eventos")
      .doc(idEvento)
      .collection(boleto)
      .onSnapshot((querySnapShot) => {
        const docs = [];
        querySnapShot.forEach((doc) => {
          const { nombre, asistencia } = doc.data();

          docs.push({ nombre, asistencia, id: doc.id });
        });
        setInvitados(docs);
      });
  }, [boleto, idEvento]);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{boleto}</h1>
      <Segment inverted>
        <List divided inverted relaxed>
          {invitados.map(({ nombre, asistencia, id }) => (
            <List.Item
              key={id}
              style={{
                backgroundColor: asistencia ? "green" : null,
                paddingLeft: 20
              }}
            >
              <List.Content floated="left">
                <p>{nombre}</p>
              </List.Content>
              <List.Content
                floated="right"
                onClick={() => {
                  setIdSelect(id);
                  setMarcar(!marcar);
                }}
              >
                {marcar && idSelect === id ? (
                  <>
                    <Button
                      primary
                      content={asistencia ? "Marcar Salida" : "Marcar Entrada"}
                      style={{ padding: "5px 9px" }}
                    />
                  </>
                ) : asistencia ? (
                  <Icon name="check" />
                ) : (
                  <Icon name="close" />
                )}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </>
  );
};

export default StaffList;
