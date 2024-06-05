import { getAnuncios } from "../Services/firebase.js"; // Ajusta la ruta según sea necesario

document.addEventListener('DOMContentLoaded', function () {
    viewAnuncios();
});

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
