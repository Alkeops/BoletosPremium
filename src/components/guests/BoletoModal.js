import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../common/modals/ModalWrapper";
import * as Yup from "yup";
import TextInput from "../common/form/TextInput";
import { Button } from "semantic-ui-react";
import { closeModal } from "../common/modals/modalReducer";
import { crearBoleto } from "./guestAction";
import { agregarTipoBoleto } from "../events/eventActions";

const BoletoModal = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <ModalWrapper size="mini" header="Crea tu boleto">
      <Formik
        initialValues={{ nombre: "" }}
        validationSchema={Yup.object({
          nombre: Yup.string().required("Ingresa el nombre del boleto")
        })}
        onSubmit={(values, { setSubmitting }) => {
          try {
            dispatch(crearBoleto(id, values));
            dispatch(agregarTipoBoleto(id, values));
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
            <TextInput name="nombre" placeholder="Nombre del boleto" />
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

export default BoletoModal;
