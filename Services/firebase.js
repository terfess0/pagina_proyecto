
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
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
  apiKey: "AIzaSyBxSNlsFYLpGDcH0Nby5bkoaPMcwwo7oSI",
  authDomain: "trabajodonaciones.firebaseapp.com",
  projectId: "trabajodonaciones",
  storageBucket: "trabajodonaciones.appspot.com",
  messagingSenderId: "731615721762",
  appId: "1:731615721762:web:f2e0c850e45d28b3a5cd7b",
  measurementId: "G-298Y4KM7ZY"
}


const app = initializeApp(firebaseConfig)
const auth = getAuth()

const db = getFirestore()

const storage = getStorage()
//referencia a storage firebase
const storageRef = ref(storage)

const provider = new FacebookAuthProvider()
provider.addScope('user_birthday')


export const registrarusuario = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const iniciarsesion = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

provider.setCustomParameters({
  'display': 'popup'
})

export const iniciarsesionfacebook = () =>
  signInWithPopup(auth, provider)

export const agregardatos = (nit, nombre, tipo, estado, cantidad, fecha) =>
  addDoc(collection(db, "donaciones"), {
    nitCedula: nit,
    nombre: nombre,
    tipo: tipo,
    estado: estado,
    cantidad: cantidad,
    fecha: fecha
  })

export const logout = () => signOut(auth)

export function userstate() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
    } else {
      Swal.fire({
        title: 'Sesión cerrada',
        icon: 'info'
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          window.location.href = "../index.html";
        }
      })
    }
  })
}


//obtener donacion
export const getDonacion = (nit) => {
  const q = query(collection(db, "donaciones"), where("nitCedula", "==", nit))

  const querySnapshot = getDocs(q)
  return querySnapshot
}

//hacer nueva solicitud (usuario - index)
export const addSoli = (nombre, tel, email, mensaje) =>
  addDoc(collection(db, "solicitudes"), {
    nombreSolicitud: nombre,
    telSolicitud: tel,
    emailSolicitud: email,
    cuerpoSolicitud: mensaje,
    estadoSolicitud: false,
    fechaSolicitud: serverTimestamp()
  })

//buscar solicitud existente con mismo mensaje (evitar duplicadas en el momento)
export const getSoliByContent = async (mensaje) => {
  const soliQuery = query(collection(db, "solicitudes"), where("cuerpoSolicitud", "==", mensaje))
  const querySnapshot = await getDocs(soliQuery)
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data()
  }
  return null
}


//solicitudes (admin)
export const getSolicitudes = () =>
  getDocs(collection(db, "solicitudes"))

export const updateEstadoSoli = (idSoli, estado) => {
  const solicitudRef = doc(db, "solicitudes", idSoli)
  updateDoc(solicitudRef, {
    estadoSolicitud: estado
  })
}
//--------------------------------------------
//----------CARRUSEL---------------

//metodos de storage----------------
export const subirImgCarousel = (file, fileName) => {
  const carouselRef = ref(storage, 'imagenes/carrusel/' + fileName)
  return uploadBytes(carouselRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref)
  })
}
//metodos firestore
export const updateImgCarousel = (urlStorage, nameImg) => {
  const carouselRef = doc(db, "carruselImgs", nameImg)
  const updateData = {}
  updateData['imagen'] = urlStorage // Utilizamos corchetes y la variable nameImg como nombre de propiedad
  updateDoc(carouselRef, updateData)
}
//nueva imagen carousel (storage)
export const subirNewImgCarousel = (file, randomName) => {
  const carouselRef = ref(storage, 'imagenes/carrusel/' + randomName)
  return uploadBytes(carouselRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref)
  })
}
//nueva imagen carousel (firestore)
export const setNewImgCarousel = (urlStorage) => {
  const carouselRef = collection(db, "carruselImgs")
  const updateData = {}
  updateData['imagen'] = urlStorage 
  addDoc(carouselRef, updateData)
}
//borrar imagen carrusel
export const deleteImgCarrusel = (idDoc) =>
  deleteDoc(doc(db, "carruselImgs", idDoc))

  
//obtener las url de imagenes del carousel (url en firestore a recurso en storage)
export const getCarouselImgs = () =>
  getDoc(doc(db, "imagenes", "carousel"))

export const getCarouselImgsAditional = () =>
  getDocs(collection(db, "carruselImgs"))

//--------------------------------------------



//---------CONTENIDO IMAGENES INDEX----------

//metodos de storage----------------
export const subirImgContent = (file, fileName) => {
  const carouselRef = ref(storage, 'imagenes/contenido/' + fileName)
  return uploadBytes(carouselRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref)
  })
}

//metodos firestore
export const updateImgContent = (urlStorage, nameImg) => {
  const carouselRef = doc(db, "imagenes", "contenido")
  const updateData = {}
  updateData[nameImg] = urlStorage // Utilizamos corchetes y la variable nameImg como nombre de propiedad
  updateDoc(carouselRef, updateData)
}

//obtener las url de imagenes del contenido (url en firestore a recurso en storage)
export const getContentImgs = () =>
  getDoc(doc(db, "imagenes", "contenido"))

//--------------------------------------------