import React from "react";
import { useSelector } from "react-redux";
import { List } from "semantic-ui-react";
import EventListItem from "./EventListItem";

const EventList = () => {
  const { eventos } = useSelector((state) => state.evento);

  return (
    <List divided inverted relaxed>
      {eventos.map(({ nombre, id }) => (
        <EventListItem nombre={nombre} id={id} key={id} />
      ))}
    </List>
  );
};

export default EventList;
