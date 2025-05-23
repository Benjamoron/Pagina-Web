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
  });

  const btnEditar = document.createElement("button");
  btnEditar.textContent = "Editar";
  btnEditar.className = "btnEditar";
  btnEditar.addEventListener("click", function () {
    document.getElementById("marca").value = marca;
    actualizarModelos();

    // Esperar que se actualicen los modelos antes de setear el modelo
    setTimeout(() => {
      document.getElementById("modelo").value = modelo;
    }, 50);

    document.getElementById("anio").value = anio;
    document.getElementById("condicion").value = condicion;
    // alert("Estás editando un reloj. Presioná 'Agregar al carrito' para guardar los cambios.");
    document.getElementById("mensajeEdicion").style.display = "block";

    tarjetaAEditar = tarjeta;
  });

  tarjeta.appendChild(imagen);
  tarjeta.appendChild(descripcion);
  tarjeta.appendChild(btnEditar);
  tarjeta.appendChild(btnEliminar);

  if (tarjetaAEditar) {
    tarjetaAEditar.replaceWith(tarjeta);
    tarjetaAEditar = null;
  } else {
    document.getElementById("listaRelojes").appendChild(tarjeta);
  }

  this.reset();


  document.getElementById("mensajeEdicion").style.display = "none";

});

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
