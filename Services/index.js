import { getAnuncios, regContacto } from "../Services/firebase.js";

document.addEventListener('DOMContentLoaded', function () {
    viewAnuncios();
});

const contacto = document.getElementById('sendContacto')

async function viewAnuncios() {
    try {
        const query = await getAnuncios();
        const caja = document.getElementById('contain_anuncios');
        caja.innerHTML = '';

        query.forEach(doc => {
            const data = doc.data();

            const container = document.createElement('div');
            container.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mt-2';
            container.innerHTML = `
                <div class="card">
                    <img class="cover cover-small" src="${doc.data().imagen}" alt="Imagen de anuncio">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${data.titulo}</h5>
                        <p class="fst-italic card-text">${data.descripcion}</p>
                    </div>
                </div>
            `;

            caja.appendChild(container);
        });
    } catch (error) {
        console.error('No se pudo recibir imagenes del carrusel:', error);
    }
}


async function enviarContacto() {
    const nombres = document.getElementById('nombres')
    const correo = document.getElementById('correo')
    const mensjae = document.getElementById('mensage')

    if (nombres.value === "" || correo.value === "" || mensjae.value === "") {
        alert("Debe llenar todos los campos")
        nombres.focus()
        return
    } else {
        try {
            await regContacto(nombres.value, correo.value, mensjae.value);
            alert("Contacto enviado, en los procimos dias te responderemos a tu correo")

            nombres.value = ""
            correo.value = ""
            mensjae.value = ""
        } catch (error) {
            alert("Algo salio mal, intentalo más tarde")
            console.error('No se pudo hacer el contacto:', error)

            nombres.value = ""
            correo.value = ""
            mensjae.value = ""
        }
    }

}

window.addEventListener('DOMContentLoaded', async () => {
    contacto.addEventListener('click', enviarContacto)
})
