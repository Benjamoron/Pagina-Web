let tarjetaAEditar = null;

// ✅ Solo ejecuta si el formulario existe (evita errores en index.html)
const form = document.getElementById("formReloj");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const modelo = document.getElementById("modelo").value;
    const marca = document.getElementById("marca").value;
    const anio = document.getElementById("anio").value;
    const condicion = document.getElementById("condicion").value;

    if (!modelo || !marca || !anio || !condicion) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-reloj";

    const imagen = document.createElement("img");
    imagen.src = `img/${modelo.toLowerCase()}.jpg`;
    imagen.alt = `${marca} ${modelo}`;
    imagen.className = "foto-reloj";

    const descripcion = document.createElement("p");
    descripcion.innerHTML = `
      <strong>Modelo:</strong> ${modelo} |
      <strong>Marca:</strong> ${marca} |
      <strong>Año:</strong> ${anio} |
      <strong>Condición:</strong> ${condicion}
    `;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btnEliminar";
    btnEliminar.addEventListener("click", function () {
      tarjeta.remove();

      const lista = document.getElementById("listaRelojes");
      const tarjetasRestantes = lista.querySelectorAll(".tarjeta-reloj").length;

      if (tarjetasRestantes === 0) {
        const botonCompra = lista.querySelector(".btnCompletar");
        if (botonCompra) botonCompra.remove();
      }
    });

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btnEditar";
    btnEditar.addEventListener("click", function () {
      document.getElementById("marca").value = marca;
      actualizarModelos();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById("modelo").value = modelo;
      }, 10);

      document.getElementById("anio").value = anio;
      document.getElementById("condicion").value = condicion;
      document.getElementById("mensajeEdicion").style.display = "block";
      tarjetaAEditar = tarjeta;
    });

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(btnEditar);
    tarjeta.appendChild(btnEliminar);

    const lista = document.getElementById("listaRelojes");
    const cantidadAntes = lista.querySelectorAll(".tarjeta-reloj").length;

    if (tarjetaAEditar) {
      tarjetaAEditar.replaceWith(tarjeta);
      tarjetaAEditar = null;
    } else {
      lista.appendChild(tarjeta);
    }

    if (cantidadAntes === 0) {
      const btnCompletar = document.createElement("button");
      btnCompletar.textContent = "Completar compra";
      btnCompletar.className = "btnCompletar";
      btnCompletar.addEventListener("click", function () {
        const tarjetas = lista.querySelectorAll(".tarjeta-reloj");
        tarjetas.forEach(t => t.remove());
        tarjetaAEditar = null;
        document.getElementById("mensajeEdicion").style.display = "none";
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        this.remove();
        alert("Compra completada. ¡Gracias por tu compra!");
      });
      lista.appendChild(btnCompletar);
    } else {
      const botonCompra = lista.querySelector(".btnCompletar");
      if (botonCompra) lista.appendChild(botonCompra);
    }

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 50);

    this.reset();
    document.getElementById("mensajeEdicion").style.display = "none";
  });

  // 👇 Función para cargar modelos según la marca
  const modelosPorMarca = {
    Casio: ["G-Shock", "Edifice", "Vintage"],
    Rolex: ["Submariner", "Daytona", "Datejust"],
    Seiko: ["Presage", "Prospex", "Astron"],
    Swatch: ["Moonswatch", "Irony", "Classic"],
    Omega: ["Speedmaster", "Seamaster", "Constellation"]
  };

  function actualizarModelos() {
    const marca = document.getElementById("marca").value;
    const modeloSelect = document.getElementById("modelo");

    modeloSelect.innerHTML = "<option value=''>Modelo</option>";

    if (modelosPorMarca[marca]) {
      modelosPorMarca[marca].forEach(function (modelo) {
        const opcion = document.createElement("option");
        opcion.value = modelo;
        opcion.textContent = modelo;
        modeloSelect.appendChild(opcion);
      });
    }
  }

  document.getElementById("marca").addEventListener("change", actualizarModelos);
}

// ✅ Fondo animado para index.html
window.addEventListener("load", function () {
  const fondo = document.getElementById("fondo");
  if (!fondo) return;

  const imagenesDeFondo = [
    "img/fondo1.jpg",
    "img/fondo2.jpg",
    "img/fondo3.jpg"
  ];

  let fondoIndex = 0;

  function cambiarFondo() {
    fondo.style.backgroundImage = `url('${imagenesDeFondo[fondoIndex]}')`;
    fondoIndex = (fondoIndex + 1) % imagenesDeFondo.length;
  }

  cambiarFondo();
  setInterval(cambiarFondo, 5000);
});
