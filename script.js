const modelosPorMarca = {
  Casio: ['G-Shock','Edifice','Vintage'],
  Rolex: ['Submariner','Daytona','Datejust'],
  Seiko: ['Presage','Prospex','Astron'],
  Swatch: ['Moonswatch','Irony','Classic'],
  Omega: ['Speedmaster','Seamaster','Constellation']
};

function actualizarModelos() {
  const marca = document.getElementById('marca').value;
  const sel = document.getElementById('modelo');
  sel.innerHTML = '<option value="">Modelo</option>';
  if (modelosPorMarca[marca]) {
    modelosPorMarca[marca].forEach(m => {
      const o = document.createElement('option');
      o.value = m;
      o.textContent = m;
      sel.appendChild(o);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('marca').addEventListener('change', actualizarModelos);

  let tarjetaAEditar = null;
  const form = document.getElementById('formReloj');
  const lista = document.getElementById('listaRelojes');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const mod = document.getElementById('modelo').value;
    const mar = document.getElementById('marca').value;
    const an = document.getElementById('anio').value;
    const cd = document.getElementById('condicion').value;
    if (!mod || !mar || !an || !cd) return alert('Completa todos los campos.');

    const card = document.createElement('div');
    card.className = 'tarjeta-reloj';

    const img = document.createElement('img');
    img.src = `img/${mod.toLowerCase().split(' ').join('-')}.jpg`;
    img.alt = `${mar} ${mod}`;
    img.className = 'foto-reloj';

    const p = document.createElement('p');
    p.innerHTML = `<strong>${mar}</strong> ${mod}<br/><em>${an} - ${cd}</em>`;

    const eBtn = document.createElement('button');
    eBtn.textContent = 'Editar';
    eBtn.className = 'btnEditar';
    eBtn.addEventListener('click', () => {
      document.getElementById('marca').value = mar;
      actualizarModelos();
      setTimeout(() => document.getElementById('modelo').value = mod, 10);
      document.getElementById('anio').value = an;
      document.getElementById('condicion').value = cd;
      document.getElementById('mensajeEdicion').style.display = 'block';
      tarjetaAEditar = card;
    });

    const xBtn = document.createElement('button');
    xBtn.textContent = 'Eliminar';
    xBtn.className = 'btnEliminar';
    xBtn.addEventListener('click', () => card.remove());

    card.append(img, p, eBtn, xBtn);

    if (tarjetaAEditar) {
      tarjetaAEditar.replaceWith(card);
      tarjetaAEditar = null;
    } else {
      lista.appendChild(card);
    }

    // Scroll al final
    card.scrollIntoView({ behavior: 'smooth', block: 'end' });

    // Botón Completar compra
    if (!document.querySelector('.btn-completar')) {
      const cBtn = document.createElement('button');
      cBtn.textContent = 'Completar compra';
      cBtn.className = 'btn-completar';
      cBtn.addEventListener('click', () => {
        alert('¡Gracias por su compra!');
        lista.innerHTML = '';
        cBtn.remove();
      });
      document.getElementById('comprar').appendChild(cBtn);
    }

    form.reset();
    document.getElementById('mensajeEdicion').style.display = 'none';
  });
});
console.log("✅ script.js ACTUALIZADO desde VS Code - " + new Date().toLocaleTimeString());
