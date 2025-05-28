let tarjetaAEditar = null;

document.getElementById("formReloj").addEventListener("submit", function(e) {
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

  // 👉 Solo crear el botón si se agregó la PRIMERA tarjeta
  if (cantidadAntes === 0) {
    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "Completar compra";
    btnCompletar.className = "btnCompletar";
    btnCompletar.addEventListener("click", function () {
      const tarjetas = lista.querySelectorAll(".tarjeta-reloj");
      tarjetas.forEach(t => t.remove());
      tarjetaAEditar = null;
      document.getElementById("mensajeEdicion").style.display = "none";
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      this.remove();
      alert("Compra completada. ¡Gracias por tu compra!");
    });
    lista.appendChild(btnCompletar);
  } else {
    // Siempre mover el botón al final
    const botonCompra = lista.querySelector(".btnCompletar");
    if (botonCompra) lista.appendChild(botonCompra);
  }

  // ✅ Scroll suave hasta el final de la página (después de todo el render)
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
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
    modelosPorMarca[marca].forEach(function(modelo) {
      const opcion = document.createElement("option");
      opcion.value = modelo;
      opcion.textContent = modelo;
      modeloSelect.appendChild(opcion);
    });
  }
}

// 👇 Llamar a actualizarModelos cuando se cambia la marca
document.getElementById("marca").addEventListener("change", actualizarModelos);
