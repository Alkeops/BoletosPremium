import firebase from "./firebase";

const db = firebase.firestore();
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
      tipoBoleto: []
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
