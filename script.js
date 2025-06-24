const relojesColeccion = [
  { marca: "Omega", modelo: "Speedmaster", img: "img/speedmaster.jpg", precio: 8000 },
  { marca: "Rolex", modelo: "Submariner", img: "img/submariner.jpg", precio: 13500 },
  { marca: "Casio", modelo: "G-Shock", img: "img/g-shock.jpg", precio: 650 },
  { marca: "Seiko", modelo: "Prospex", img: "img/prospex.jpg", precio: 700 },
  { marca: "Omega", modelo: "Seamaster", img: "img/seamaster.jpg", precio: 4500 },
  { marca: "Swatch", modelo: "Irony", img: "img/irony.jpg", precio: 200 },
  { marca: "Casio", modelo: "Edifice", img: "img/edifice.jpg", precio: 400 },
  { marca: "Casio", modelo: "Vintage", img: "img/vintage.jpg", precio: 250 },
  { marca: "Rolex", modelo: "Daytona", img: "img/daytona.jpg", precio: 20000 },
  { marca: "Rolex", modelo: "Datejust", img: "img/datejust.jpg", precio: 11500 },
  { marca: "Seiko", modelo: "Presage", img: "img/presage.jpg", precio: 850 },
  { marca: "Seiko", modelo: "Astron", img: "img/astron.jpg", precio: 1300 },
  { marca: "Swatch", modelo: "Moonswatch", img: "img/moonswatch.jpg", precio: 450 },
  { marca: "Swatch", modelo: "Classic", img: "img/classic.jpg", precio: 2000 },
  { marca: "Omega", modelo: "Constellation", img: "img/constellation.jpg", precio: 4800 }
];

let total = 0;
let tarjetaEditando = null;
let carrito = [];

function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", total);
}

function cargarCarritoDesdeStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  const totalGuardado = localStorage.getItem("total");

  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    total = parseFloat(totalGuardado) || 0;

    carrito.forEach(reloj => {
      agregarAlCarrito(reloj, true);
    });
  }
}

function cargarColeccion() {
  const contenedor = document.getElementById("collectionRow");
  contenedor.innerHTML = "";

  relojesColeccion.forEach((reloj, i) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${reloj.img}" class="card-img-top" alt="${reloj.marca} ${reloj.modelo}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${reloj.marca} ${reloj.modelo}</h5>
          <p class="card-text fw-bold">$${reloj.precio}</p>
          <button class="btn boton-dorado mt-auto" data-i="${i}">
            ${tarjetaEditando ? "Reemplazar" : "Agregar al carrito"}
          </button>
        </div>
      </div>`;
    contenedor.appendChild(col);
  });

  contenedor.querySelectorAll("button[data-i]").forEach(btn => {
    btn.onclick = () => {
      const reloj = relojesColeccion[btn.dataset.i];
      tarjetaEditando ? reemplazarTarjeta(reloj) : agregarAlCarrito(reloj);
    };
  });
}

function agregarAlCarrito(reloj, desdeStorage = false) {
  const lista = document.getElementById("listaRelojes");

  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4";
  col.innerHTML = `
    <div class="tarjeta-reloj p-3 text-center h-100">
      <img class="imagen-reloj" src="${reloj.img}" alt="${reloj.marca} ${reloj.modelo}">
      <p class="mb-2"><strong>${reloj.marca}</strong> ${reloj.modelo}<br><em>2025</em><br>$${reloj.precio}</p>
      <button class="boton-editar btn btn-sm mb-2">Editar</button>
      <button class="boton-eliminar btn btn-sm">Eliminar</button>
    </div>`;

  col.querySelector(".boton-eliminar").onclick = () => {
    col.remove();
    total -= reloj.precio;
    carrito = carrito.filter(r => !(r.marca === reloj.marca && r.modelo === reloj.modelo && r.precio === reloj.precio));
    actualizarTotal();
    guardarCarritoEnStorage();
    if (!lista.children.length) document.querySelector(".boton-finalizar")?.remove();
  };

  col.querySelector(".boton-editar").onclick = () => {
    tarjetaEditando = col;
    mostrarMensajeEdicion();
    cargarColeccion();
    document.getElementById("coleccion").scrollIntoView({ behavior: "smooth" });
  };

  if (tarjetaEditando) {
    // Detectar el reloj anterior por el texto
    const texto = tarjetaEditando.querySelector("p").innerText;
    const partes = texto.split("\n");
    const datosTexto = partes[0].split(" ");
    const marcaAntigua = datosTexto[0];
    const modeloAntiguo = datosTexto.slice(1).join(" ");

    // Buscar y reemplazar en el carrito
    const index = carrito.findIndex(r => r.marca === marcaAntigua && r.modelo === modeloAntiguo);
    if (index !== -1) carrito[index] = reloj;

    tarjetaEditando.replaceWith(col);
    tarjetaEditando = null;
    ocultarMensajeEdicion();
    cargarColeccion();
    guardarCarritoEnStorage();
  } else {
    lista.appendChild(col);
    if (!desdeStorage) carrito.push(reloj);
    guardarCarritoEnStorage();
  }

  total += reloj.precio;
  actualizarTotal();
  agregarBotonFinalizar();

  setTimeout(() => {
    const y = document.getElementById("listaRelojes").getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, 300);
}

function reemplazarTarjeta(reloj) {
  agregarAlCarrito(reloj);
}

function mostrarMensajeEdicion() {
  const aviso = document.getElementById("reemplazoAviso");
  aviso.classList.remove("d-none");
  aviso.textContent = "Estás editando un reloj. Elegí uno de la colección para reemplazarlo.";
}

function ocultarMensajeEdicion() {
  const aviso = document.getElementById("reemplazoAviso");
  aviso.classList.add("d-none");
  aviso.textContent = "";
}

function actualizarTotal() {
  document.getElementById("precioTotal").textContent = total ? `Total: $${total}` : "";
}

function agregarBotonFinalizar() {
  let finalizar = document.querySelector(".boton-finalizar");
  if (!finalizar) {
    finalizar = document.createElement("button");
    finalizar.textContent = "Completar compra";
    finalizar.className = "btn boton-finalizar w-auto d-block mx-auto mt-3";
    finalizar.onclick = () => {
      alert("¡Gracias por tu compra!");
      document.getElementById("listaRelojes").innerHTML = "";
      total = 0;
      carrito = [];
      actualizarTotal();
      finalizar.remove();
      localStorage.removeItem("carrito");
      localStorage.removeItem("total");
    };
    document.getElementById("comprar").appendChild(finalizar);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarColeccion();
  cargarCarritoDesdeStorage();
});
