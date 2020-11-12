import firebase from "./firebase";

export const db = firebase.firestore();
const eventosRef = db.collection("eventos");
//TODO Modificar este punto

//EVENTOS
export const cargarEventos = async () => {
  const user = firebase.auth().currentUser;
  const query = await eventosRef.where("uid", "==", user.uid).get();
  const docs = [];
  query.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
};

export const crearNuevoEvento = async (id, evento) => {
  const user = firebase.auth().currentUser;
  return await db
    .collection("eventos")
    .doc(id)
    .set({
      ...evento,
      uid: user.uid,
      nombre: evento.nombre,
      tipoBoleto: [],
      staffID: Math.floor(Math.random() * 899999999 + 100000000)
    });
};
export const eliminarEvento = async (id) => eventosRef.doc(id).delete();
//MULTIPLES FUNCIONES
export const eliminarTodosLosDoc = async (eventoId, tipoBoleto) => {
  const query = await eventosRef.doc(eventoId).collection(tipoBoleto).get();
  query.forEach((doc) => {
    doc.ref.delete();
  });
};

//AGREGAR CONTRASEÑA STAFF
export const agregarContraseña = async (id, contraseña) => {
  return await eventosRef.doc(id).update({
    contraseña
  });
};

//TIPOS DE BOLETOS

export const crearNuevoBoleto = async (id, values) => {
  return await eventosRef.doc(id).update({
    tipoBoleto: firebase.firestore.FieldValue.arrayUnion(values)
  });
};
//INVITADOS
export const agregarInvitado = async (id, tipo, datos, docId) => {
  return eventosRef.doc(id).collection(tipo).doc(docId).set(datos);
};

export const eliminarInvitado = async (idDoc, tipoBoleto, id) =>
  await eventosRef.doc(idDoc).collection(tipoBoleto).doc(id).delete();

export const leerListaInvitados = async (id, tipo) => {
  const query = await eventosRef.doc(id).collection(tipo).get();
  const docs = [];
  query.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
};

//STAFF

export const buscarEventoStaff = async ({ numero, contraseña }) => {
  const prueba = await eventosRef
    .where("staffID", "==", numero)
    .where("contraseña", "==", contraseña)
    .get();

  let evento;
  prueba.forEach((doc) => (evento = { ...doc.data(), id: doc.id }));

  if (evento) {
    return {
      nombre: evento.nombre,
      tipoBoleto: evento.tipoBoleto,
      id: evento.id
    };
  } else {
    const errorMessage = {
      code: 404,
      message: "Numero de evento o contraseña invalidos"
    };
    throw errorMessage;
  }
};

export const dataFromSnapshot = (snapshot) => {
  if (!snapshot.exits) return undefined;
  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return { ...data, id: snapshot.id };
};

const getEventsFromFirestore = (observer) =>
  db.collection("eventos").onSnapshot(observer);

export default getEventsFromFirestore;
