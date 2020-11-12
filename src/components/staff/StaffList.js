import React, { useEffect, useState } from "react";
import { List, Segment } from "semantic-ui-react";
import { db } from "../../config/firebase/firestoreService";
import StaffListItem from "./StaffListItem";

const StaffList = ({ boleto, idEvento }) => {
  const [invitados, setInvitados] = useState([]);
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
      <Segment>
        <List divided>
          {invitados.map(({ nombre, asistencia, id }) => (
            <StaffListItem
              key={id}
              nombre={nombre}
              asistencia={asistencia}
              id={id}
            />
          ))}
        </List>
      </Segment>
    </>
  );
};

export default StaffList;
