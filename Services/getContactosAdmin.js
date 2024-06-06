import { getContactos, deleteContacto } from "../Services/firebase.js";

document.addEventListener('DOMContentLoaded', function () {
    viewContactos();
});

async function viewContactos() {
    try {
        const query = await getContactos();
        const caja = document.getElementById('contain_admin_contactos');
        caja.innerHTML = '';

        
        const cabecera = document.createElement('thead')

        cabecera.innerHTML = `
            <tr>
                <th>Nombres</th>
                <th>Correo</th>
                <th>Mensaje</th>
                <th>Action</th>
            </tr>
        `
        caja.appendChild(cabecera)
        

        query.forEach(doc => {

            const row = document.createElement('tr');
            row.setAttribute('id', doc.id);

            row.innerHTML = `
                <td><span class="editable" data-field="titulo">${doc.data().nombres}</span></td>
                <td><span class="editable" data-field="descripcion">${doc.data().correo}</span></td>
                <td><span class="editable" data-field="imagen">${doc.data().mensaje}</span></td>
                <td><button class="boton1 btn btn-danger text-dark">Borrar</button></td>
            `;

            row.querySelector('.boton1').addEventListener('click', () => delete_data(doc.id));

            caja.appendChild(row);
        });
    } catch (error) {
        console.error('No se pudo recibir Contactos:', error);
    }
}

async function delete_data(docUserId) {

    try {
        const action = deleteContacto(docUserId)
        const borrar = await action
        alert("Contacto eliminado.");

        viewContactos();


    } catch (error) {
        console.error("Error al eliminar datos de Contacto:", error.code);

        switch (error.code) {
            case 'permission-denied':
                alert("Permisos insuficientes para eliminar el Contacto.");
                break;
            case 'not-found':
                alert("Contacto no encontrado.");
                break;
            default:
                alert("Error al eliminar Contacto: " + error.message);
                break;
        }
    }
}

