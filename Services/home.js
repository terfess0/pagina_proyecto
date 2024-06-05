import { userstate, logout } from "./firebase.js";

userstate();
const registrar = document.getElementById('btnreg');
const sesion = document.getElementById('btnatras');
const buscar_donacion = document.getElementById('btnsearch');

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


function getFechaActual() {
    const fechaActual = new Date();
    const nombresMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const dia = fechaActual.getDate();
    const mes = nombresMeses[fechaActual.getMonth()];
    const anio = fechaActual.getFullYear();
    return `${dia} de ${mes} de ${anio}`;
}

window.addEventListener("DOMContentLoaded", () => {
    sesion.addEventListener('click', cerrarsesion);
});
