import React from "react";
import { Label, List } from "semantic-ui-react";

const StaffListItem = ({ nombre, asistencia, id }) => {
  return (
    <List.Item
      className="ui red"
      style={{
        //color: asistencia ? "white" : null,
        padding: ".5rem 10px"
        //background: asistencia ? "green" : null
      }}
    >
      <List.Content floated="left">
        <p style={{ fontSize: 16, fontWeight: 600 }}>{nombre}</p>
      </List.Content>
      <List.Content floated="right">
        <Label size="large" color={asistencia ? "green" : "black"}>
          {asistencia ? "En el evento" : "No asistió"}
        </Label>
      </List.Content>
    </List.Item>
  );
};

export default StaffListItem;
