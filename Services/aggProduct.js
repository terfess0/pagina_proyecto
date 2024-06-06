import { addProducto, addImgProductoStorage } from "../Services/firebase.js";
import { resizeImage } from "../Services/redimensionar.js";


const actioen = document.getElementById('btnadd')

async function nuevoProducto() {

    const titulo = document.getElementById('edttitle')
    const descripcion = document.getElementById('edtdescrip')
    const precio = document.getElementById('edtprecio')
    const cantidad = document.getElementById('edtcantidad')
    const fileInput = document.getElementById('fileInputProducto');
    const file_sin_redimensionar = fileInput.files[0];

    if (titulo.value === "" || descripcion.value === "" || precio.value === "" || cantidad.value === "") {
        alert('Debe llenar todos los campos')
        titulo.focus()

        return;
    }

    if (!file_sin_redimensionar) {
        alert('No se ha seleccionado ningún archivo de imagen')
        fileInput.focus();
        return;
    } else {
        try {
            //redimencionar imagen a 1024x500
            const file = await resizeImage(file_sin_redimensionar, 1024, 500, 0.8)

            let fileName = generateRandomFileName(8);

            const url = await addImgProductoStorage(file, fileName);

            await addProducto(titulo.value, descripcion.value, precio.value, cantidad.value, url);
            alert("Producto creado correctamente");

            // Limpiar campos
            titulo.value = "";
            descripcion.value = "";
            precio.value = "";
            cantidad.value = "";
        } catch (error) {
            alert('Algo salió mal, inténtelo más tarde.');
            console.error("Error :: " + error);

        } finally {
            // Limpiar fileInput
            fileInput.value = null;

            // Limpiar campos
            titulo.value = "";
            descripcion.value = "";
            precio.value = "";
            cantidad.value = "";
        }
    }

};


window.addEventListener("DOMContentLoaded", async () => {
    actioen.addEventListener('click', nuevoProducto)
});


function generateRandomFileName(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}