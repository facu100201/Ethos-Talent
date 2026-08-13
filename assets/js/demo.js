/* ==========================================================================
   Ethos Talent — motor de demostración
   Suma lineal ponderada, deliberadamente simple y legible.
   Datos sintéticos: ninguna persona real es evaluada aquí.
   ========================================================================== */
(function () {
  'use strict';

  var listaEl = document.getElementById('lista-candidatos');
  if (!listaEl) return;

  /* ---------------------------------------------------------------
     1. Escalas del modelo

     Cada variable se convierte a un valor de 0 a 1 y se multiplica por
     su peso. Las tablas están aquí, a la vista, porque el sitio afirma
     que el modelo es auditable.
     --------------------------------------------------------------- */

  /* Experiencia: rendimientos decrecientes. Pasar de 0 a 2 años cambia
     mucho más el desempeño esperado que pasar de 10 a 15. */
  var EXP_VALOR = [0, 0.15, 0.35, 0.60, 0.85, 1.00];
  var EXP_ETQ = ['Sin experiencia', 'Menos de 1 año', '1 a 2 años',
                 '2 a 5 años', '5 a 10 años', 'Más de 10 años'];

  /* Formación: el título aporta 0.60 y las certificaciones hasta 0.40.
     Quien no tiene carrera puede llegar a 0.40 solo con certificaciones,
     de modo que no haber podido estudiar no bloquea el campo. */
  var TITULO_VALOR = 0.60;
  var CERTS_VALOR = [0, 0.15, 0.28, 0.40];
  var CERTS_ETQ = ['sin certificaciones', '1 certificación',
                   '2 certificaciones', 'más de 2 certificaciones'];

  var VARIABLES = [
    {
      id: 'exp',
      nombre: 'Experiencia relevante',
      norm: function (d) { return EXP_VALOR[d.exp] || 0; },
      detalle: function (d) { return EXP_ETQ[d.exp] || EXP_ETQ[0]; }
    },
    {
      id: 'form',
      nombre: 'Formación acreditada',
      norm: function (d) {
        return Math.min(1, (d.titulo ? TITULO_VALOR : 0) + (CERTS_VALOR[d.certs] || 0));
      },
      detalle: function (d) {
        return (d.titulo ? 'Título universitario' : 'Sin título universitario') +
               ', ' + (CERTS_ETQ[d.certs] || CERTS_ETQ[0]);
      }
    },
    {
      id: 'comp',
      nombre: 'Habilidades y competencias',
      norm: function (d) { return d.comp / 10; },
      detalle: function (d) { return d.comp + ' de 10'; }
    },
    {
      id: 'disp',
      nombre: 'Disponibilidad',
      norm: function (d) { return d.disp / 10; },
      detalle: function (d) { return d.disp + ' de 10'; }
    },
    {
      id: 'eval',
      nombre: 'Resultado de la evaluación',
      norm: function (d) { return d.eval / 100; },
      detalle: function (d) { return Math.round(d.eval) + ' de 100'; }
    }
  ];

  /* Cinco candidaturas sintéticas. `pausa` está en el expediente porque la
     persona la declaró, pero ninguna variable del modelo la lee. */
  var CANDIDATOS = [
    { id: 'A', nombre: 'Candidatura A', exp: 3, titulo: true,  certs: 1, comp: 8, disp: 9,  eval: 81, pausa: 0 },
    { id: 'B', nombre: 'Candidatura B', exp: 2, titulo: true,  certs: 2, comp: 7, disp: 7,  eval: 74, pausa: 0 },
    { id: 'C', nombre: 'Candidatura C', exp: 4, titulo: false, certs: 3, comp: 8, disp: 8,  eval: 69, pausa: 24 },
    { id: 'D', nombre: 'Candidatura D', exp: 1, titulo: true,  certs: 0, comp: 7, disp: 10, eval: 77, pausa: 0 },
    { id: 'E', nombre: 'Candidatura E', exp: 4, titulo: false, certs: 1, comp: 6, disp: 6,  eval: 58, pausa: 8 }
  ];

  var actual = 'A';

  /* ---------------------------------------------------------------
     2. Cálculo
     --------------------------------------------------------------- */
  function el(id) { return document.getElementById(id); }

  function radio(nombre) {
    var marcado = document.querySelector('input[name="' + nombre + '"]:checked');
    return marcado ? marcado.value : null;
  }

  function pesos() {
    var p = {};
    VARIABLES.forEach(function (v) {
      var campo = el('p-' + v.id);
      p[v.id] = campo ? parseFloat(campo.value) : 0;
    });
    return p;
  }

  function datosFormulario() {
    return {
      exp:    parseInt(radio('d-exp'), 10) || 0,
      titulo: radio('d-titulo') === '1',
      certs:  parseInt(radio('d-certs'), 10) || 0,
      comp:   parseFloat(el('d-comp').value),
      disp:   parseFloat(el('d-disp').value),
      eval:   parseFloat(el('d-eval').value)
    };
  }

  /* Devuelve el total (0-100) y los puntos que aportó cada variable.
     Los pesos se normalizan: lo que cuenta es su proporción relativa. */
  function calcular(datos, p) {
    var suma = VARIABLES.reduce(function (a, v) { return a + p[v.id]; }, 0);
    var aportes = [];
    var total = 0;

    VARIABLES.forEach(function (v) {
      var n = Math.min(1, Math.max(0, v.norm(datos)));
      var pesoRel = suma > 0 ? p[v.id] / suma : 0;
      var puntos = n * pesoRel * 100;
      total += puntos;
      aportes.push({
        variable: v,
        puntos: puntos,
        tope: pesoRel * 100,
        detalle: v.detalle(datos)
      });
    });

    return { total: total, aportes: aportes, sumaPesos: suma };
  }

  function scoreDeCandidato(c, p) { return calcular(c, p).total; }

  /* ---------------------------------------------------------------
     3. Interfaz
     --------------------------------------------------------------- */
  function pintarLista() {
    var p = pesos();
    listaEl.innerHTML = '';

    CANDIDATOS.slice()
      .sort(function (a, b) { return scoreDeCandidato(b, p) - scoreDeCandidato(a, p); })
      .forEach(function (c) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'candidato-btn';
        btn.setAttribute('aria-pressed', String(c.id === actual));

        var etq = document.createElement('span');
        etq.textContent = c.nombre;

        var val = document.createElement('span');
        val.className = 'mini-score';
        val.textContent = Math.round(scoreDeCandidato(c, p));

        btn.appendChild(etq);
        btn.appendChild(val);
        btn.addEventListener('click', function () {
          actual = c.id;
          cargarCandidato(c);
          refrescar();
          pintarAuditoria();
        });
        listaEl.appendChild(btn);
      });
  }

  function marcarRadio(nombre, valor) {
    var op = document.querySelector('input[name="' + nombre + '"][value="' + valor + '"]');
    if (op) op.checked = true;
  }

  function cargarCandidato(c) {
    marcarRadio('d-exp', c.exp);
    marcarRadio('d-titulo', c.titulo ? '1' : '0');
    marcarRadio('d-certs', c.certs);
    el('d-comp').value = c.comp;
    el('d-disp').value = c.disp;
    el('d-eval').value = c.eval;
    el('msg-pausa').textContent = '';
  }

  function guardarEnCandidato() {
    var c = CANDIDATOS.filter(function (x) { return x.id === actual; })[0];
    if (!c) return;
    var d = datosFormulario();
    c.exp = d.exp; c.titulo = d.titulo; c.certs = d.certs;
    c.comp = d.comp; c.disp = d.disp; c.eval = d.eval;
  }

  function pintarEtiquetas() {
    var d = datosFormulario();
    el('v-comp').textContent = d.comp + ' / 10';
    el('v-disp').textContent = d.disp + ' / 10';
    el('v-eval').textContent = Math.round(d.eval) + ' / 100';

    VARIABLES.forEach(function (v) {
      var salida = el('vp-' + v.id);
      var campo = el('p-' + v.id);
      if (salida && campo) salida.textContent = campo.value;
    });
  }

  function pintarResultado() {
    var datos = datosFormulario();
    var r = calcular(datos, pesos());
    var total = Math.round(r.total);

    el('score-num').textContent = total;
    el('score-banda').style.width = Math.max(0, Math.min(100, r.total)) + '%';

    var etq = el('score-etq');
    var intervalo = el('score-intervalo');

    if (r.sumaPesos === 0) {
      etq.textContent = 'Sin pesos configurados';
      intervalo.textContent = 'Con todos los pesos en cero el modelo no puede decir nada. Un 0 ' +
        'aquí no significa que la persona valga cero.';
    } else {
      etq.textContent = 'Qué tanto encaja con el puesto';
      intervalo.textContent = 'En realidad está entre ' +
        Math.max(0, total - 6) + ' y ' + Math.min(100, total + 6) +
        '. Es una estimación, no una medida exacta de nadie.';
    }

    var cont = el('contribuciones');
    cont.innerHTML = '';

    r.aportes.forEach(function (a) {
      var wrap = document.createElement('div');
      wrap.className = 'contrib';

      var fila = document.createElement('div');
      fila.className = 'contrib__fila';
      var n = document.createElement('span');
      n.textContent = a.variable.nombre;
      var pts = document.createElement('span');
      pts.textContent = '+' + a.puntos.toFixed(1) + ' pts';
      fila.appendChild(n);
      fila.appendChild(pts);

      var barra = document.createElement('div');
      barra.className = 'contrib__barra';
      var i = document.createElement('i');
      i.style.width = Math.max(0, Math.min(100, a.puntos)) + '%';
      barra.appendChild(i);

      var nota = document.createElement('p');
      nota.className = 'contrib__detalle';
      nota.textContent = a.detalle + ' · tope con este peso: ' + a.tope.toFixed(1) + ' pts';

      wrap.appendChild(fila);
      wrap.appendChild(barra);
      wrap.appendChild(nota);
      cont.appendChild(wrap);
    });

    pintarResumen(r, datos);
  }

  /* ---------------------------------------------------------------
     Conclusión ejecutiva

     Seis tramos para los 101 resultados posibles. Ninguno recomienda
     descartar a nadie: describen la evidencia disponible y señalan qué
     conviene verificar. La decisión siempre se devuelve a la persona.
     --------------------------------------------------------------- */
  var TRAMOS = [
    {
      min: 90,
      etq: 'Coincidencia muy alta con el perfil buscado',
      frase: 'El expediente cubre prácticamente todo lo que pide la vacante. Conviene ' +
             'priorizar la entrevista y usarla para verificar en persona lo que un formulario ' +
             'no alcanza a mostrar.'
    },
    {
      min: 75,
      etq: 'Coincidencia alta con el perfil buscado',
      frase: 'El expediente cubre con holgura los requisitos declarados. La entrevista debería ' +
             'concentrarse en el margen que queda abierto y en los aspectos que no se miden aquí.'
    },
    {
      min: 60,
      etq: 'Buena coincidencia, con puntos que verificar',
      frase: 'El perfil responde a lo esencial de la vacante, aunque no en todos los criterios ' +
             'por igual. Vale la pena confirmar en entrevista el punto más débil antes de sacar ' +
             'conclusiones.'
    },
    {
      min: 45,
      etq: 'Coincidencia media: hace falta más información',
      frase: 'El expediente responde a una parte de lo que pide la vacante. Un resultado en este ' +
             'rango suele significar que falta información en el formato del CV, no que la ' +
             'persona no pueda hacer el trabajo.'
    },
    {
      min: 25,
      etq: 'Coincidencia parcial con lo declarado en la vacante',
      frase: 'Con lo capturado, el expediente coincide poco con los requisitos. Antes de ' +
             'concluir nada conviene revisarlo a mano: la experiencia relevante muchas veces no ' +
             'aparece con el nombre que el puesto usa.'
    },
    {
      min: 0,
      etq: 'Evidencia insuficiente para estimar el encaje',
      frase: 'No hay datos suficientes para que el modelo diga algo útil. Esto habla del ' +
             'expediente, no de la persona: puede estar incompleto, mal capturado o describir la ' +
             'misma experiencia con otras palabras. Corresponde revisarlo manualmente.'
    }
  ];

  function tramoDe(n) {
    for (var i = 0; i < TRAMOS.length; i++) {
      if (n >= TRAMOS[i].min) return TRAMOS[i];
    }
    return TRAMOS[TRAMOS.length - 1];
  }

  function pintarResumen(r, datos) {
    var titulo = el('resumen-titulo');
    var cuerpo = el('resumen-cuerpo');
    var total = Math.round(r.total);

    if (r.sumaPesos === 0) {
      titulo.textContent = 'Sin criterios activos';
      cuerpo.innerHTML = 'Todos los pesos están en cero, así que el modelo no está evaluando ' +
        'nada. El 0 que ves no dice nada de la persona: dice que no le hemos pedido al sistema ' +
        'que mire ningún criterio.';
      return;
    }

    var tramo = tramoDe(total);

    /* Lo que más aporta y donde queda más margen */
    var fuerte = r.aportes[0], debil = r.aportes[0], maxPerdida = -1;
    r.aportes.forEach(function (a) {
      if (a.puntos > fuerte.puntos) fuerte = a;
      var perdida = a.tope - a.puntos;
      if (perdida > maxPerdida) { maxPerdida = perdida; debil = a; }
    });

    var texto = 'Con los pesos configurados, esta candidatura obtiene <em>' + total +
      ' de 100</em>, en un rango real de ' + Math.max(0, total - 6) + ' a ' +
      Math.min(100, total + 6) + '. ' + tramo.frase + ' ';

    texto += 'Lo que más suma es <em>' + fuerte.variable.nombre.toLowerCase() + '</em> (' +
      fuerte.puntos.toFixed(1) + ' de ' + fuerte.tope.toFixed(1) + ' pts posibles)';

    if (maxPerdida >= 0.5) {
      texto += ', y donde queda más margen es <em>' + debil.variable.nombre.toLowerCase() +
        '</em> (' + debil.puntos.toFixed(1) + ' de ' + debil.tope.toFixed(1) + ' pts).';
    } else {
      texto += ', y no queda margen relevante: el perfil está en el tope de todos los ' +
        'criterios activos.';
    }

    var c = CANDIDATOS.filter(function (x) { return x.id === actual; })[0];
    if (c && c.pausa > 0) {
      texto += ' Nota: el expediente declara ' + c.pausa + ' meses de pausa laboral, que ' +
        '<em>no</em> restaron un solo punto.';
    }

    titulo.textContent = tramo.etq;
    cuerpo.innerHTML = texto;
  }

  function refrescar() {
    pintarEtiquetas();
    pintarResultado();
    pintarLista();
  }

  /* ---------------------------------------------------------------
     4. Demostración: las pausas laborales no restan puntos
     --------------------------------------------------------------- */
  el('btn-pausa').addEventListener('click', function () {
    var c = CANDIDATOS.filter(function (x) { return x.id === actual; })[0];
    var antes = Math.round(calcular(datosFormulario(), pesos()).total);
    c.pausa = (c.pausa || 0) + 18;
    var despues = Math.round(calcular(datosFormulario(), pesos()).total);

    el('msg-pausa').textContent =
      'Listo: ' + c.pausa + ' meses de pausa en el expediente. El resultado pasó de ' +
      antes + ' a ' + despues + ', o sea, no se movió. El dato está ahí porque la persona lo ' +
      'declaró, pero ninguna variable del modelo lo lee: castigar una pausa por cuidados o ' +
      'enfermedad sería medir su suerte, no su capacidad.';
  });

  /* ---------------------------------------------------------------
     5. Prueba de impacto adverso (regla del 4/5)
     --------------------------------------------------------------- */

  /* Generador determinista: la misma población en cada carga, para que
     cualquiera pueda reproducir el resultado que ve en pantalla. */
  function prng(semilla) {
    var s = semilla >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Dos grupos de 120 personas con la MISMA distribución en todo lo que el
     modelo mide: experiencia, formación, competencias, disponibilidad y
     evaluación. La única diferencia es haber estudiado en una universidad
     considerada de prestigio: 70 % en el grupo 1 frente a 10 % en el grupo 2.
     Esa brecha no mide capacidad, mide origen. */
  var POBLACION = (function () {
    var r = prng(20260115);
    var gente = [];
    [1, 2].forEach(function (grupo) {
      var probPrestigio = grupo === 1 ? 0.70 : 0.10;
      for (var i = 0; i < 120; i++) {
        gente.push({
          grupo: grupo,
          exp: Math.floor(r() * 6),
          titulo: r() < 0.55,
          certs: Math.floor(r() * 4),
          comp: 4 + Math.floor(r() * 7),
          disp: 5 + Math.floor(r() * 6),
          eval: 50 + r() * 45,
          prestigio: r() < probPrestigio
        });
      }
    });
    return gente;
  })();

  var BONO_PROXY = 15; // Puntos que regalaría la variable proxy si se incluyera

  function auditar() {
    var umbral = parseFloat(el('a-umbral').value);
    var usarProxy = el('a-proxy').checked;
    var p = pesos();
    var conteo = { 1: { total: 0, pasa: 0 }, 2: { total: 0, pasa: 0 } };

    POBLACION.forEach(function (persona) {
      var s = calcular(persona, p).total;
      if (usarProxy && persona.prestigio) s += BONO_PROXY;
      conteo[persona.grupo].total++;
      if (s >= umbral) conteo[persona.grupo].pasa++;
    });

    var t1 = conteo[1].total ? conteo[1].pasa / conteo[1].total : 0;
    var t2 = conteo[2].total ? conteo[2].pasa / conteo[2].total : 0;
    var mayor = Math.max(t1, t2);
    var menor = Math.min(t1, t2);

    return {
      t1: t1, t2: t2,
      ratio: mayor > 0 ? menor / mayor : 1,
      umbral: umbral,
      proxy: usarProxy
    };
  }

  function pintarAuditoria() {
    var a = auditar();
    var pct = function (x) { return (x * 100).toFixed(1) + ' %'; };

    el('v-umbral').textContent = a.umbral;
    el('tasa-1').textContent = pct(a.t1);
    el('tasa-2').textContent = pct(a.t2);

    var numEl = el('ratio-num');
    var verdicto = el('ratio-verdicto');
    var caja = el('caja-alerta');
    var titulo = el('alerta-titulo');
    var texto = el('alerta-texto');
    var btn = el('btn-exportar');
    var msg = el('msg-exportar');

    numEl.textContent = a.ratio.toFixed(2);

    if (a.ratio < 0.8) {
      numEl.className = 'ratio-num mal';
      verdicto.textContent = 'Hay indicio de sesgo';
      caja.style.borderLeft = '4px solid var(--alerta)';
      titulo.textContent = '⚠ Exportación bloqueada';
      texto.innerHTML = 'El índice está en <strong>' + a.ratio.toFixed(2) + '</strong>, debajo del ' +
        '0.80 que marca la regla del 4/5. Con esta configuración el grupo 2 avanza mucho menos ' +
        'que el grupo 1, aunque tenga la misma formación, experiencia y competencias. ' +
        (a.proxy
          ? 'La culpable es la variable de prestigio: no mide qué sabe la persona, mide dónde ' +
            'pudo estudiar. Apágala y mira cómo se corrige.'
          : 'Baja el umbral: un corte muy alto agranda diferencias mínimas y termina filtrando ' +
            'por origen sin que nadie lo quisiera.');
      btn.disabled = true;
      msg.textContent = 'Para seguir hay que escribir una justificación, que queda registrada ' +
        'con nombre y se reporta al Comité de Ética.';
    } else {
      numEl.className = 'ratio-num ok';
      verdicto.textContent = 'Sin indicio de sesgo';
      caja.style.borderLeft = '4px solid var(--acento)';
      titulo.textContent = 'Puedes exportar';
      texto.innerHTML = 'El índice está en <strong>' + a.ratio.toFixed(2) + '</strong>, dentro de ' +
        'la regla del 4/5. Ojo: esto no prueba que el proceso sea justo, solo que no vimos sesgo ' +
        'en <em>esta</em> etapa y con <em>esta</em> configuración.';
      btn.disabled = false;
      msg.textContent = '';
    }
  }

  el('btn-exportar').addEventListener('click', function () {
    el('msg-exportar').textContent =
      'Ranking exportado en formato abierto. La descarga queda en la bitácora junto con la ' +
      'versión del modelo y los pesos que usaste, para poder auditarla después.';
  });

  /* ---------------------------------------------------------------
     6. Modal de impugnación
     --------------------------------------------------------------- */
  var modal = el('modal-impugnar');
  var abridor = el('btn-impugnar');

  function abrirModal() { modal.hidden = false; el('btn-cerrar-modal').focus(); }
  function cerrarModal() { modal.hidden = true; abridor.focus(); }

  abridor.addEventListener('click', abrirModal);
  el('btn-cerrar-modal').addEventListener('click', cerrarModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) cerrarModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) cerrarModal();
  });

  /* ---------------------------------------------------------------
     7. Eventos
     --------------------------------------------------------------- */
  function alCambiarDatos() {
    guardarEnCandidato();
    refrescar();
    pintarAuditoria();
  }

  el('form-datos').addEventListener('input', alCambiarDatos);
  el('form-datos').addEventListener('change', alCambiarDatos);

  el('form-pesos').addEventListener('input', function () {
    refrescar();
    pintarAuditoria();
  });

  el('a-umbral').addEventListener('input', pintarAuditoria);
  el('a-proxy').addEventListener('change', pintarAuditoria);

  ['form-datos', 'form-pesos'].forEach(function (id) {
    el(id).addEventListener('submit', function (e) { e.preventDefault(); });
  });

  /* ---------------------------------------------------------------
     8. Arranque
     --------------------------------------------------------------- */
  cargarCandidato(CANDIDATOS[0]);
  refrescar();
  pintarAuditoria();
})();
