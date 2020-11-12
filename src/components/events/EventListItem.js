import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, List } from "semantic-ui-react";
import { borrarEvento } from "./eventActions";

const EventListItem = ({ nombre, id }) => {
  const dispatch = useDispatch();

  return (
    <List.Item>
      <List.Content
        floated="left"
        style={{ marginLeft: "20px" }}
        as={Link}
        to={`/admin/${id}`}
      >
        <h2>{nombre}</h2>
      </List.Content>
      <List.Content floated="right">
        <Button content="Ver" positive as={Link} to={`/admin/${id}`} />
        <Button
          negative
          content="Eliminar"
          onClick={() => dispatch(borrarEvento(id))}
        />
      </List.Content>
    </List.Item>
  );
};

export default EventListItem;
