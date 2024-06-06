import { getProductos } from "../Services/firebase.js";

document.addEventListener('DOMContentLoaded', function () {
    viewProductos();
});


async function viewProductos() {
    try {
        const query = await getProductos();
        const caja = document.getElementById('contain_productos');
        caja.innerHTML = '';

        query.forEach(doc => {
            const data = doc.data();

            const container = document.createElement('div');
            container.className = 'col-2 col-sm-6 col-md-4 col-lg-3 mt-2';
            container.innerHTML = `

					<div class="card">
						<img title="${data.titulo}" class="cover cover-small"
							src="${data.imagen}">
						</img>
						<div class="card-body">
							<center>
								<h5 class="card-title">${data.titulo}</h5>
							</center>
							<p class="card-text">${data.descripcion}</p>
							<span class="badge text-bg-success">${data.precio}</span>
							<span class="badge rounded-pill text-bg-secondary">${data.cantidad}</span>
							<P></P>
						</div>
					</div>

            `;

            caja.appendChild(container);
        });
    } catch (error) {
        console.error('No se pudo recibir imagenes del carrusel:', error);
    }
}