import { userstate, logout } from "../Services/firebase.js";

userstate();

const sesion = document.getElementById('btnatras');


async function cerrarsesion() {
    try {
        await logout();
        console.log("Sesion cerrada");
        
    } catch (error) {
        Swal.fire({
            title: 'No se pudo cerrar la sesión',
            icon: 'error'
        }).then(() => {
            window.location.reload();
        });
    }
}


window.addEventListener("DOMContentLoaded", () => {
    sesion.addEventListener('click', cerrarsesion);
});
