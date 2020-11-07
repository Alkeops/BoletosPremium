import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../common/modals/ModalWrapper";
import * as Yup from "yup";
import TextInput from "../common/form/TextInput";
import { Button } from "semantic-ui-react";
import { crearEvento } from "./eventActions";
import { closeModal } from "../common/modals/modalReducer";

const EventModal = () => {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="mini" header="Crea tu evento">
      <Formik
        initialValues={{ nombre: "" }}
        validationSchema={Yup.object({
          nombre: Yup.string().required("Ingresa el nombre del evento")
        })}
        onSubmit={(values, { setSubmitting }) => {
          try {
            dispatch(crearEvento(values));
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
            <TextInput name="nombre" placeholder="Nombre del evento" />
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Crea el evento"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default EventModal;
