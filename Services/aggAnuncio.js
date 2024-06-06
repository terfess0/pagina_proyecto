import { addAnuncio, addImgAnuncioStorage } from "../Services/firebase.js";
import { resizeImage } from "../Services/redimensionar.js";


const actioen = document.getElementById('btnreg')

async function nuevoAnuncio() {

    const titulo = document.getElementById('edttitulo')
    const descripcion = document.getElementById('edtdescripcion')
    const imagen = document.getElementById('edtimagen')
    const fileInput = document.getElementById('fileInputNew');
    const file_sin_redimensionar = fileInput.files[0];

    if (titulo.value === "" || descripcion.value === "") {
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

            const url = await addImgAnuncioStorage(file, fileName);

            await addAnuncio(titulo.value, descripcion.value, url);
            alert("Anuncio creado correctamente");

            // Limpiar campos
            titulo.value = "";
            descripcion.value = "";
            imagen.value = "";
        } catch (error) {
            alert('Algo salió mal, inténtelo más tarde.');
            console.error("Error :: " + error);

            // Limpiar campos
            titulo.value = "";
            descripcion.value = "";
            imagen.value = "";
        } finally {
            // Limpiar fileInput
            fileInput.value = null;
        }
    }

};


window.addEventListener("DOMContentLoaded", async () => {
    actioen.addEventListener('click', nuevoAnuncio)
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