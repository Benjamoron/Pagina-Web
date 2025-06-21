const relojesColeccion = [
  
  { marca: "Omega", modelo: "Speedmaster", img: "img/speedmaster.jpg", desc: "El icónico Moonwatch." },
  { marca: "Omega", modelo: "Seamaster", img: "img/seamaster.jpg", desc: "Inspirado en el original de 1957." },
  { marca: "Omega", modelo: "Constellation", img: "img/constellation.jpg", desc: "Estilo y precisión desde 1952." },
  
  { marca: "Casio", modelo: "Edifice", img: "img/edifice.jpg", desc: "Diseño deportivo con crono analógico." },
  { marca: "Casio", modelo: "Vintage", img: "img/vintage.jpg", desc: "Estilo retro con funciones modernas." },
  { marca: "Casio", modelo: "G-Shock", img: "img/g-shock.jpg", desc: "Clásico digital resistente a golpes." },
  { marca: "Rolex", modelo: "Submariner", img: "img/submariner.jpg", desc: "El legendario reloj de buceo." },
  { marca: "Rolex", modelo: "Daytona", img: "img/daytona.jpg", desc: "Cronógrafo de alto prestigio." },
  { marca: "Rolex", modelo: "Datejust", img: "img/datejust.jpg", desc: "Clásico con fechador distintivo." },
  { marca: "Seiko", modelo: "Prospex", img: "img/prospex.jpg", desc: "Divers japonés con caja turtle." },
  { marca: "Seiko", modelo: "Presage", img: "img/presage.jpg", desc: "Elegancia japonesa automática." },
  { marca: "Seiko", modelo: "Astron", img: "img/astron.jpg", desc: "GPS Solar de alta precisión." },
  { marca: "Swatch", modelo: "Irony", img: "img/irony.jpg", desc: "Cronógrafo ligero y accesible." },
  { marca: "Swatch", modelo: "Moonswatch", img: "img/moonswatch.jpg", desc: "Colaboración Swatch x Omega." },
  { marca: "Swatch", modelo: "Classic", img: "img/classic.jpg", desc: "Diseños atemporales y divertidos." }
  
];

const modelosPorMarca = {
  Casio: ["G-Shock", "Edifice", "Vintage"],
  Rolex: ["Submariner", "Daytona", "Datejust"],
  Seiko: ["Presage", "Prospex", "Astron"],
  Swatch: ["Moonswatch", "Irony", "Classic"],
  Omega: ["Speedmaster", "Seamaster", "Constellation"]
};

function actualizarModelos() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo");
  modelo.innerHTML = '<option value="">Modelo</option>';
  (modelosPorMarca[marca] || []).forEach(m => {
    modelo.insertAdjacentHTML("beforeend", `<option>${m}</option>`);
  });
}

function cargarColeccion() {
  const contenedor = document.getElementById("collectionRow");
  relojesColeccion.forEach((r, i) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${r.img}" class="card-img-top" alt="${r.marca} ${r.modelo}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${r.marca} ${r.modelo}</h5>
          <button class="btn boton-dorado mt-auto" data-bs-toggle="modal" data-bs-target="#watchModal" data-i="${i}">Ver más</button>
        </div>
      </div>`;
    contenedor.appendChild(col);
  });

  contenedor.addEventListener("click", e => {
    const btn = e.target.closest('[data-bs-target="#watchModal"]');
    if (!btn) return;
    const r = relojesColeccion[btn.dataset.i];
    document.getElementById("watchModalLabel").textContent = `${r.marca} ${r.modelo}`;
    document.getElementById("watchModalImg").src = r.img;
    document.getElementById("watchModalImg").alt = `${r.marca} ${r.modelo}`;
    document.getElementById("watchModalDesc").textContent = r.desc;

    const btnAgregar = document.getElementById("botonComprarModal");
    btnAgregar.onclick = (event) => {
      event.preventDefault();
      const relojAgregado = {
        marca: r.marca,
        modelo: r.modelo,
        img: r.img
      };

      const modal = bootstrap.Modal.getInstance(document.getElementById("watchModal"));
      modal.hide();

      setTimeout(() => {
        agregarDesdeColeccion(relojAgregado);
      }, 350);
    };
  });
}

function agregarDesdeColeccion(reloj) {
  const lista = document.getElementById("listaRelojes");
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4";
  col.innerHTML = `
    <div class="tarjeta-reloj p-3 text-center h-100">
      <img class="imagen-reloj" src="${reloj.img}" alt="${reloj.marca} ${reloj.modelo}">
      <p class="mb-2"><strong>${reloj.marca}</strong> ${reloj.modelo}<br><em>2025</em></p>
      <button class="boton-editar btn btn-sm mb-2">Editar</button>
      <button class="boton-eliminar btn btn-sm">Eliminar</button>
    </div>`;

  col.querySelector(".boton-editar").onclick = () => {
    document.getElementById("marca").value = reloj.marca;
    actualizarModelos();
    setTimeout(() => document.getElementById("modelo").value = reloj.modelo, 10);
    document.getElementById("anio").value = "2025";
    document.getElementById("mensajeEdicion").classList.remove("d-none");
    tarjetaEditando = col;
    document.getElementById("comprar").scrollIntoView({ behavior: "smooth" });
  };

  col.querySelector(".boton-eliminar").onclick = () => {
    col.remove();
    const listaVacia = lista.children.length === 0;
    const finalizar = document.querySelector(".boton-finalizar");
    if (listaVacia && finalizar) finalizar.remove();
  };

  lista.appendChild(col);

  let finalizar = document.querySelector(".boton-finalizar");
  if (!finalizar) {
    finalizar = document.createElement("button");
    finalizar.textContent = "Completar compra";
    finalizar.className = "btn boton-finalizar w-auto d-block mx-auto mt-3";
    finalizar.onclick = () => {
      alert("\u00a1Gracias por tu compra!");
      lista.innerHTML = "";
      finalizar.remove();
    };
    document.getElementById("comprar").appendChild(finalizar);
  }

  const offsetTop = col.getBoundingClientRect().top + window.scrollY - 300;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
}

let tarjetaEditando = null;
document.addEventListener("DOMContentLoaded", () => {
  cargarColeccion();
  document.getElementById("marca").addEventListener("change", actualizarModelos);
});
