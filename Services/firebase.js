
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'

//firebase firestore
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  getDoc,
  deleteDoc
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'


//firebase storage
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js"


const firebaseConfig = {
  apiKey: "AIzaSyCP4gFyC2sPXXbHpq0J8ZietRL4rkcB0hc",
  authDomain: "trabajocafe-956a4.firebaseapp.com",
  projectId: "trabajocafe-956a4",
  storageBucket: "trabajocafe-956a4.appspot.com",
  messagingSenderId: "518733260293",
  appId: "1:518733260293:web:7f027942dfc8a2301a5e6c",
  measurementId: "G-05LC2XED51"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth()
const analytics = getAnalytics(app);
const db = getFirestore()

const storage = getStorage()
//referencia a storage firebase
const storageRef = ref(storage)


export const iniciarsesion = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const logout = () => signOut(auth)

export function userstate() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
    } else {
      Swal.fire({
        title: 'Sesión finalizada',
        icon: 'info'
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          window.location.href = "../index.html";
        }
      })
    }
  })
}

//obtener las url de imagenes del carousel (url en firestore a recurso en storage)
export const getAnuncios = () =>
  getDocs(collection(db, "anuncios"))

export const addAnuncio = (t, d, i) =>
  addDoc(collection(db, "anuncios"), {
    titulo: t,
    descripcion: d,
    imagen: i
  })

export const deleteAnuncio = (idDoc) =>
  deleteDoc(doc(db, "anuncios", idDoc))

export const updateAnuncio = (doce, updateData) => {
  updateDoc(doc(db, "anuncios", doce), updateData)
}

export const addImgAnuncioStorage = (file, randomName) => {
  const anuncioRef = ref(storage, 'imagenes/' + randomName)
  return uploadBytes(anuncioRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref)
  })
}

export const regContacto = (nom, corr, mess) =>
  addDoc(collection(db, "contactos"), {
    nombres: nom,
    correo: corr,
    mensaje: mess
  })

export const getContactos = () =>
  getDocs(collection(db, "contactos"))

export const deleteContacto = (idDoc) =>
  deleteDoc(doc(db, "contactos", idDoc))


export const getProductos = () =>
  getDocs(collection(db, "productos"))

export const addProducto = (t, d, p, c, i) =>
  addDoc(collection(db, "productos"), {
    titulo: t,
    descripcion: d,
    precio: p,
    cantidad: c,
    imagen: i
  })

export const deleteProducto = (idDoc) =>
  deleteDoc(doc(db, "productos", idDoc))

export const updateProducto = (doce, updateData) => {
  updateDoc(doc(db, "productos", doce), updateData)
}

export const addImgProductoStorage = (file, randomName) => {
  const productoRef = ref(storage, 'imagenes/' + randomName)
  return uploadBytes(productoRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref)
  })
}

