import React from "react";
import ModalWrapper from "../common/modals/ModalWrapper";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../common/form/TextInput";
import { Button, Label } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../common/modals/modalReducer";
import { signInWithEmail } from "../../config/firebase/firebaseService";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <ModalWrapper size="mini" header="Inicia Sesion">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Ingresa un email")
            .email("Email no valido"),
          password: Yup.string().required("Ingresa una contraseña valida")
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await signInWithEmail(values);
            setSubmitting(false);
            dispatch(closeModal());
            history.push("/admin");
          } catch ({ code }) {
            console.log(code);
            let mensaje = "";
            switch (code) {
              case "auth/user-not-found":
                mensaje = "Usuario no encontrado";
                break;
              case "auth/wrong-password":
                mensaje = "Contraseña incorrecta";
                break;
              case "auth/too-many-requests":
                mensaje = "Demasiados intentos, prueba otra vez en 15 minutos";
                break;
              default:
                return code;
            }

            setSubmitting(false);
            setErrors({ auth: mensaje });
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <TextInput name="email" placeholder="Email" />
            <TextInput name="password" placeholder="Password" type="password" />
            {errors.auth && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.auth}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Inicia Sesion"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;
