import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signOutFirebase } from "../../config/firebase/firebaseService";
import { openModal } from "../common/modals/modalReducer";

const { Menu, Container, Button, Icon } = require("semantic-ui-react");

const Header = () => {
  const { auth } = useSelector((state) => state.auth);
  const history = useHistory(); //TODO probando redireccionar al cerrar sesion
  const dispatch = useDispatch();
  const handleCerrarSesion = async () => {
    try {
      await signOutFirebase(); //TODO (((())))))))((((((()))))))
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header>
      <Menu stackable inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <h1>CyberPass</h1>
          </Menu.Item>
          <Menu.Item name="Eventos">
            {/*TODO Probablemnete eliminar, estructurar mejor la info*/}
            <Icon name="question circle outline" />{" "}
          </Menu.Item>
          {auth && (
            <Menu.Item as={Link} to="/admin">
              <Button
                onClick={() => history.push("/admin")}
                color="youtube"
                content="Mi cuenta"
              />
            </Menu.Item>
          )}
          <Menu.Item position="right">
            {!auth ? ( //TODO reordenar correctamente esto
              <Button
                onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
                basic
                inverted
                content="Iniciar Sesion"
                style={{ marginLeft: "0.5em" }}
              />
            ) : (
              <Button
                onClick={handleCerrarSesion}
                basic
                inverted
                content="Cerrar Sesion"
                style={{ marginLeft: "0.5em" }}
              />
            )}
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
