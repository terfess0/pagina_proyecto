import { iniciarsesion } from '../Services/firebase.js'

const validar = document.getElementById('btnlogin')


async function Login() {
  const usuario = document.getElementById("edtemail")
  const clave = document.getElementById("edtpsw")

  //validar email y contraseña
  if (!usuario.value || !clave.value) {
    Swal.fire({
      title: 'Por favor llene los campos',
      icon: 'error'
    });
    usuario.focus()
    return
  }

  //validar contraseña
  if (clave.value.length < 8) {
    Swal.fire({
      title: 'La contraseña debe tener al menos 8 caracteres.',
      icon: 'error'
    });
    clave.focus()
    return;
  }

  const sesion = iniciarsesion(usuario.value, clave.value)
  const confirmar = await sesion
    .then((confirmar) => {
      try {
        // Signed in 
        const user = confirmar.user;
        console.log(user)
        Swal.fire({
          title: 'Sesion validada, bienvenido administrador.',
          icon: 'success'
        }).then(() => {
          window.location.href = "../Templates/home.html";
        })

        // ...
      } catch (error) {

      }

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage)
      try {
        Swal.fire({
          title: 'Sesion no validada',
          icon: 'error'
        })

      } catch (e) {

      }
    });
}


window.addEventListener("DOMContentLoaded", async () => {
  validar.addEventListener('click', Login)
})