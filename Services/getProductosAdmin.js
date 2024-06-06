import { getProductos, updateProducto, deleteProducto } from "../Services/firebase.js";

document.addEventListener('DOMContentLoaded', function () {
    viewProductos();
});

async function viewProductos() {
    try {
        const query = await getProductos();
        const caja = document.getElementById('contain_admin_productos');
        caja.innerHTML = '';

        
        const cabecera = document.createElement('thead')

        cabecera.innerHTML = `
            <tr>
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Action</th>
                <th>Action</th>
            </tr>
        `
        caja.appendChild(cabecera)
        

        query.forEach(doc => {

            const row = document.createElement('tr');
            row.setAttribute('id', doc.id);

            row.innerHTML = `
                <td><span class="editable" data-field="titulo">${doc.data().titulo}</span></td>
                <td><span class="editable" data-field="descripcion">${doc.data().descripcion}</span></td>
                <td><span class="editable" data-field="precio">${doc.data().precio}</span></td>
                <td><span class="editable" data-field="cantidad">${doc.data().cantidad}</span></td>
                <td><span class="editable" data-field="imagen"><img style="width:50px; height:50px;" src="${doc.data().imagen}"></span></td>
                <td><button class="boton1 btn btn-danger text-dark">Borrar</button></td>
                <td><button class="boton2 btn btn-primary text-dark">Editar</button></td>
            `;

            row.querySelector('.boton1').addEventListener('click', () => delete_data(doc.id));
            row.querySelector('.boton2').addEventListener('click', () => update(doc.id, row));

            caja.appendChild(row);
        });
    } catch (error) {
        console.error('No se pudo recibir imagenes del carrusel:', error);
    }
}


function update(id, row) {
    const columns = row.getElementsByTagName('td');

    // Convertir los campos de texto en campos de entrada editables
    for (let i = 0; i < columns.length - 2; i++) { // Excluye los dos últimos botones de acción
        const span = columns[i].querySelector('span.editable');
        const value = span.innerText;
        const field = span.dataset.field;
        columns[i].innerHTML = `<input type="text" value="${value}" data-field="${field}">`;
    }

    // Cambiar el botón "Editar" por el botón "Guardar"
    const editButton = row.querySelector('.boton2');
    editButton.innerText = 'Guardar';
    editButton.removeEventListener('click', () => update(id, row)); // Eliminar el evento anterior
    editButton.addEventListener('click', () => save(id, row)); // Agregar el evento para guardar los cambios
}

async function save(id, row) {
    const columns = row.getElementsByTagName('td');
    const newData = {};

    // Recoger los nuevos datos de los campos de entrada
    for (let i = 0; i < columns.length - 2; i++) {
        const input = columns[i].querySelector('input');
        const field = input.dataset.field;
        newData[field] = input.value;
    }

    // Actualizar los datos en Firestore
    try {
        await updateProducto(id, newData);
        alert("Datos actualizados correctamente");

    } catch (error) {
        console.error("Error al actualizar los datos:", error);
        alert("Hubo un error al actualizar los datos");
    }

    viewProductos();
}

async function delete_data(docUserId) {

    try {
        const action = deleteProducto(docUserId)
        const borrar = await action
        alert("Producto eliminado.");

        viewProductos();


    } catch (error) {
        console.error("Error al eliminar datos de anuncio:", error.code);

        switch (error.code) {
            case 'permission-denied':
                alert("Permisos insuficientes para eliminar el anuncio.");
                break;
            case 'not-found':
                alert("Anuncio no encontrado.");
                break;
            default:
                alert("Error al eliminar anuncio: " + error.message);
                break;
        }
    }
}

