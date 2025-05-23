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
    // descripcion.textContent = `Modelo: ${modelo} | Marca: ${marca} | Año: ${anio} | Condición: ${condicion}`;
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
  
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(descripcion);
    tarjeta.appendChild(btnEliminar);
  
    document.getElementById("listaRelojes").appendChild(tarjeta);
    this.reset();
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
  