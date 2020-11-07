import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../common/modals/ModalWrapper";
import * as Yup from "yup";
import TextInput from "../common/form/TextInput";
import { Button } from "semantic-ui-react";
import { closeModal } from "../common/modals/modalReducer";
import { agregarNuevoInvitado } from "./guestAction";

const GuestModal = ({ id, tipoBoleto }) => {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="mini" header="Crea tu boleto">
      <Formik
        initialValues={{ nombre: "", correo: "", telefono: "" }}
        validationSchema={Yup.object({
          nombre: Yup.string().required("Ingresa el nombre del boleto"),
          correo: Yup.string()
            .email("Ingresa un email valido")
            .required("El email es obligatorio"),
          telefono: Yup.number("Solo pueden ser numeros")
            .required("El numero es obligatorio")
            .typeError("Solo puede ser un numero")
        })}
        onSubmit={(values, { setSubmitting }) => {
          try {
            dispatch(agregarNuevoInvitado(id, tipoBoleto, values));
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
            <TextInput name="nombre" placeholder="Nombre del asistente" />
            <TextInput name="correo" placeholder="Correo del asistente" />
            <TextInput name="telefono" placeholder="Telefono del asistente" />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              secondary
              content="Crea el tipo de boleto"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default GuestModal;
