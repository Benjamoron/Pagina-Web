const relojesColeccion = [
  { marca: "Omega", modelo: "Speedmaster", img: "img/speedmaster.jpg", desc: "El icónico “Moonwatch”. Cronógrafo de cuerda manual usado en las misiones Apolo. Caja de acero de 42 mm y calibre 3861." },
  { marca: "Rolex", modelo: "Submariner", img: "img/submariner.jpg", desc: "El legendario reloj de buceo desde 1953. Bisel cerámico, hermético 300 m y calibre automático 3230." },
  { marca: "Casio", modelo: "G-Shock 5600", img: "img/g-shock.jpg", desc: "Resistente a golpes, 200 m y temporizador. El clásico digital de los 80 convertido en ícono urbano." },
  { marca: "Seiko", modelo: "Prospex Turtle", img: "img/prospex.jpg", desc: "Divers japonés 200 m con caja “turtle” ergonómica y calibre automático 4R36." },
  { marca: "Omega", modelo: "Seamaster 300", img: "img/seamaster.jpg", desc: "Inspirado en el original de 1957, ahora con movimiento Master Co-Axial y resistencia magnética 15 000 gauss." },
  { marca: "Swatch", modelo: "Irony Chrono", img: "img/irony.jpg", desc: "Cronógrafo de diseño fresco en caja de aluminio, ligero y accesible." }
];

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
  });
}

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

document.addEventListener("DOMContentLoaded", () => {
  cargarColeccion();
  document.getElementById("marca").addEventListener("change", actualizarModelos);

  const form = document.getElementById("formReloj");
  const lista = document.getElementById("listaRelojes");
  let tarjetaEditando = null;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const anio = document.getElementById("anio").value;

    if (!marca || !modelo || !anio) {
      alert("Completá todos los campos.");
      return;
    }

    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="tarjeta-reloj p-3 text-center h-100">
        <img class="imagen-reloj" src="img/${modelo.toLowerCase().replaceAll(" ", "-")}.jpg" alt="${marca} ${modelo}">
        <p class="mb-2"><strong>${marca}</strong> ${modelo}<br><em>${anio}</em></p>
        <button class="boton-editar btn btn-sm mb-2">Editar</button>
        <button class="boton-eliminar btn btn-sm">Eliminar</button>
      </div>`;

    const tarjeta = col.querySelector(".tarjeta-reloj");

    tarjeta.querySelector(".boton-editar").onclick = () => {
      document.getElementById("marca").value = marca;
      actualizarModelos();
      setTimeout(() => document.getElementById("modelo").value = modelo, 10);
      document.getElementById("anio").value = anio;
      document.getElementById("mensajeEdicion").classList.remove("d-none");
      tarjetaEditando = col;
      document.getElementById("comprar").scrollIntoView({ behavior: "smooth" });
    };

    tarjeta.querySelector(".boton-eliminar").onclick = () => {
      col.remove();
      const listaVacia = lista.children.length === 0;
      const finalizar = document.querySelector(".boton-finalizar");
      if (listaVacia && finalizar) {
        finalizar.remove();
      }
    };

    if (tarjetaEditando) {
      tarjetaEditando.replaceWith(col);
      tarjetaEditando = null;
    } else {
      lista.appendChild(col);
    }

    let finalizar = document.querySelector(".boton-finalizar");
    if (!finalizar) {
      finalizar = document.createElement("button");
      finalizar.textContent = "Completar compra";
      finalizar.className = "btn boton-finalizar w-auto d-block mx-auto mt-3";
      finalizar.onclick = () => {
        alert("¡Gracias por tu compra!");
        lista.innerHTML = "";
        finalizar.remove();
      };
      document.getElementById("comprar").appendChild(finalizar);
    }

    // 🔽 Scroll con offset para mostrar el ítem un poco más arriba
    const offsetTop = col.getBoundingClientRect().top + window.scrollY - 300;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });

    form.reset();
    document.getElementById("mensajeEdicion").classList.add("d-none");
  });
});
