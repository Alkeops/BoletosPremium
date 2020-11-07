const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (payload) => ({ type: OPEN_MODAL, payload });
export const closeModal = () => ({ type: CLOSE_MODAL });

const initialState = null;

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL:
      const { modalType, id, boleto, modalProps } = payload;
      return { modalType, id, boleto, modalProps };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
