/* ==========================================================================
   Ethos Talent — calculadora de precios
   La fórmula está aquí, sin ofuscar, porque es la misma que se cotiza.
   Los seis criterios son los únicos que intervienen en el precio.
   ========================================================================== */
(function () {
  'use strict';

  var form = document.getElementById('calc-form');
  if (!form) return;

  var BASE = 4900;          // Acceso a la plataforma, soporte base y equidad incluida
  var POR_INTEGRACION = 1400;
  var DESCUENTO_SOCIAL = 0.35;

  /* Volumen escalonado DECRECIENTE: el ahorro de escala se traslada al cliente.
     Tramo 1: primeros 300 candidatos      -> $11.00 c/u
     Tramo 2: de 301 a 2 000               -> $7.50  c/u
     Tramo 3: de 2 001 en adelante         -> $4.20  c/u                      */
  var TRAMOS = [
    { hasta: 300,      precio: 11.00, etq: 'primeros 300' },
    { hasta: 2000,     precio: 7.50,  etq: 'de 301 a 2 000' },
    { hasta: Infinity, precio: 4.20,  etq: 'de 2 001 en adelante' }
  ];

  function costoVolumen(n) {
    var restante = Math.max(0, Math.floor(n));
    var previo = 0;
    var detalle = [];
    var total = 0;

    for (var i = 0; i < TRAMOS.length && restante > 0; i++) {
      var capacidad = TRAMOS[i].hasta - previo;
      var enTramo = Math.min(restante, capacidad);
      if (enTramo > 0) {
        var sub = enTramo * TRAMOS[i].precio;
        total += sub;
        detalle.push({
          etiqueta: enTramo.toLocaleString('es-MX') + ' candidatos (' + TRAMOS[i].etq +
                    ') × $' + TRAMOS[i].precio.toFixed(2),
          monto: sub
        });
        restante -= enTramo;
      }
      previo = TRAMOS[i].hasta;
    }
    return { total: total, detalle: detalle };
  }

  function pesos(n) {
    return '$' + Math.round(n).toLocaleString('es-MX') + ' MXN';
  }

  function num(id) {
    var el = document.getElementById(id);
    var v = parseFloat(el && el.value);
    return isFinite(v) ? v : 0;
  }

  function calcular() {
    var volumen = Math.max(0, num('c-volumen'));
    var integraciones = Math.max(0, num('c-integraciones'));
    var complejidad = num('c-complejidad');
    var auditoria = num('c-auditoria');
    var sla = num('c-sla');
    var responsabilidad = num('c-responsabilidad');
    var social = document.getElementById('c-social').checked;

    var vol = costoVolumen(volumen);
    var lineas = [{ etiqueta: 'Acceso a la plataforma (con Equidad incluida)', monto: BASE }];

    if (vol.detalle.length === 0) {
      lineas.push({ etiqueta: 'Volumen: ningún candidato', monto: 0 });
    } else {
      vol.detalle.forEach(function (d) { lineas.push(d); });
    }

    lineas.push({ etiqueta: 'Complejidad del modelo', monto: complejidad });
    lineas.push({ etiqueta: 'Nivel de auditoría', monto: auditoria });
    lineas.push({
      etiqueta: 'Integraciones (' + integraciones + ' × ' + pesos(POR_INTEGRACION) + ')',
      monto: integraciones * POR_INTEGRACION
    });
    lineas.push({ etiqueta: 'Soporte y SLA', monto: sla });
    lineas.push({ etiqueta: 'Responsabilidad que asumimos', monto: responsabilidad });

    var subtotal = lineas.reduce(function (a, l) { return a + l.monto; }, 0);
    var descuento = social ? subtotal * DESCUENTO_SOCIAL : 0;
    if (social) {
      lineas.push({ etiqueta: 'Tarifa social (−35 %)', monto: -descuento });
    }

    var total = Math.max(0, subtotal - descuento);

    // Pintar el desglose
    var cont = document.getElementById('calc-lineas');
    cont.innerHTML = '';
    lineas.forEach(function (l) {
      var fila = document.createElement('div');
      fila.className = 'calc-linea';
      var a = document.createElement('span');
      a.textContent = l.etiqueta;
      var b = document.createElement('span');
      b.textContent = (l.monto < 0 ? '− ' : '') + pesos(Math.abs(l.monto));
      if (l.monto < 0) b.style.color = 'var(--acento)';
      fila.appendChild(a);
      fila.appendChild(b);
      cont.appendChild(fila);
    });

    document.getElementById('calc-total').textContent = pesos(total);

    var unitario = document.getElementById('calc-unitario');
    if (volumen > 0) {
      unitario.textContent = 'Te sale a $' + (total / volumen).toFixed(2) +
        ' MXN por candidato. Ese número baja conforme creces: el ahorro de escala te lo pasamos.';
    } else {
      unitario.textContent = 'Sin candidatos solo pagas el acceso a la plataforma. No cobramos ' +
        'volumen que no usaste.';
    }
  }

  function sincronizarEtiquetas() {
    var v = document.getElementById('v-volumen');
    var i = document.getElementById('v-integraciones');
    if (v) v.textContent = Math.round(num('c-volumen')).toLocaleString('es-MX');
    if (i) i.textContent = Math.round(num('c-integraciones'));
  }

  form.addEventListener('input', function () {
    sincronizarEtiquetas();
    calcular();
  });
  form.addEventListener('change', function () {
    sincronizarEtiquetas();
    calcular();
  });
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  sincronizarEtiquetas();
  calcular();
})();
