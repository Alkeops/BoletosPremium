const { Menu, Container, Button, Icon } = require("semantic-ui-react");

const Header = ({ children }) => {
  return (
    <header>
      <Menu stackable inverted fixed="top">
        <Container>
          <Menu.Item header>
            <h1>CyberPass</h1>
          </Menu.Item>
          <Menu.Item name="Eventos">
            {/*TODO Probablemnete eliminar, estructurar mejor la info*/}
            <Icon name="question circle outline" />{" "}
          </Menu.Item>
          <Menu.Item>
            <Button positive inverted content="Crear Evento" />
          </Menu.Item>
          <Menu.Item position="right">
            <Button basic inverted content="Iniciar Sesion" />
            <Button
              basic
              inverted
              content="Registrarse"
              style={{ marginLeft: "0.5em" }}
            />
          </Menu.Item>
        </Container>
      </Menu>
      {/*
       * {children}
       */}
    </header>
  );
};

export default Header;
