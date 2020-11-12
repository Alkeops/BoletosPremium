import cuid from "cuid";
import React from "react";
import { useSelector } from "react-redux";
import { Container } from "semantic-ui-react";
import StaffList from "../../components/staff/StaffList";

const Staff = ({ match }) => {
  const idEvento = match.params.id;
  const { evento } = useSelector((state) => state.staff);
  const { nombre, tipoBoleto } = evento;
  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>{nombre}</h1>
      {tipoBoleto.map((boleto) => (
        <StaffList boleto={boleto} idEvento={idEvento} key={cuid()} />
      ))}
    </Container>
  );
};

export default Staff;
