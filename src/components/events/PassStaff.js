import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../common/modals/ModalWrapper";
import * as Yup from "yup";
import TextInput from "../common/form/TextInput";
import { Button } from "semantic-ui-react";
import { closeModal } from "../common/modals/modalReducer";
import { agregarContrasenaStaff } from "./eventActions";
//import { crearBoleto } from "./guestAction";
//import { agregarTipoBoleto } from "../events/eventActions";

const PassStaff = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="mini" header="Crea un PIN para el Staff">
      <Formik
        initialValues={{ contraseña: "" }}
        validationSchema={Yup.object({
          contraseña: Yup.string()
            .required("Ingresa una PIN de 4 digitos")
            .length(4, "El PIN debe ser de 4 digitos")
        })}
        onSubmit={(values, { setSubmitting }) => {
          try {
            console.log(values);
            dispatch(agregarContrasenaStaff(id, values));
            setSubmitting(false);
            dispatch(closeModal());
          } catch (error) {
            setSubmitting(false);
            console.log(error);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="ui form">
            <TextInput name="contraseña" placeholder="PIN" />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              secondary
              content="Agrega el PIN"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default PassStaff;
