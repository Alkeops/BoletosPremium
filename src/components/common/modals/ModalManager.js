import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../auth/LoginForm";
import EventModal from "../../events/EventModal";
import BoletoModal from "../../guests/BoletoModal";
import GuestModal from "../../guests/GuestModal";

const ModalManager = () => {
  const modalLookup = { LoginForm, EventModal, BoletoModal, GuestModal };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal;
  if (currentModal) {
    const { modalType, id, boleto, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = (
      <ModalComponent id={id} tipoBoleto={boleto} {...modalProps} />
    );
  }
  return <span>{renderedModal}</span>;
};

export default ModalManager;
