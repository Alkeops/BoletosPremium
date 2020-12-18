import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import ModalWrapper from "../common/modals/ModalWrapper";
import * as Yup from "yup";
import TextInput from "../common/form/TextInput";
import { Button, Label } from "semantic-ui-react";
import { closeModal } from "../common/modals/modalReducer";
import { cargarEventoStaff } from "./staffReducer";
import { buscarEventoStaff } from "../../config/firebase/firestoreService";
import { useHistory } from "react-router-dom";

const StaffModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <ModalWrapper size="mini" header="Acceso Staff">
      <Formik
        initialValues={{ numero: "", contraseña: "" }}
        validationSchema={Yup.object({
          numero: Yup.string().required("Ingresa el numero de evento"),
          contraseña: Yup.string()
            .required("Ingresa el PIN que te dio el administrador")
            .length(4, "El PIN es de 4 digitos")
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const evento = await buscarEventoStaff(values);
            dispatch(cargarEventoStaff(evento));
            setSubmitting(false);
            dispatch(closeModal());
            history.push(`/${evento.id}`);
          } catch ({ message }) {
            setSubmitting(false);
            setErrors({ log: message });
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form className="ui form">
            <TextInput name="numero" placeholder="Numero del evento" />
            <TextInput
              type="password"
              name="contraseña"
              placeholder="PIN del evento"
            />
            {errors.log && (
              <Label
                basic
                color="red"
                style={{ marginBottom: 10 }}
                content={errors.log}
              />
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              fluid
              size="large"
              color="teal"
              content="Entrar al evento"
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default StaffModal;
