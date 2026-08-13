/* ==========================================================================
   Ethos Talent — comportamiento transversal
   Sin dependencias externas: el sitio funciona sin conexión.
   Todo el movimiento se apaga si el sistema pide menos animación.
   ========================================================================== */
(function () {
  'use strict';

  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Año dinámico en el pie
     --------------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-anio]'), function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------------------------------------------------------------
     Menú móvil
     --------------------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-principal');

  function esMovil() { return window.matchMedia('(max-width: 980px)').matches; }

  function ajustarNav() {
    if (!nav || !toggle) return;
    if (esMovil()) {
      nav.hidden = toggle.getAttribute('aria-expanded') !== 'true';
    } else {
      nav.hidden = false;
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var abierto = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!abierto));
      nav.hidden = abierto;
    });
    window.addEventListener('resize', ajustarNav);
    ajustarNav();
  }

  /* ---------------------------------------------------------------
     Acordeones (matriz de phrónesis)
     --------------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('.acordeon__btn'), function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      var abierto = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!abierto));
      panel.hidden = abierto;
    });
  });

  /* ---------------------------------------------------------------
     Scroll: cabecera fija, barra de progreso y parallax
     Todo dentro de un único requestAnimationFrame para no encimar
     lecturas y escrituras del layout.
     --------------------------------------------------------------- */
  var cabecera = document.querySelector('.cabecera');
  var progreso = document.querySelector('.progreso');
  var capas = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var pendiente = false;

  function alDesplazar() {
    var y = window.pageYOffset || document.documentElement.scrollTop;

    if (cabecera) cabecera.classList.toggle('fija', y > 8);

    if (progreso) {
      var alto = document.documentElement.scrollHeight - window.innerHeight;
      progreso.style.width = (alto > 0 ? Math.min(100, (y / alto) * 100) : 0) + '%';
    }

    if (!menosMovimiento) {
      for (var i = 0; i < capas.length; i++) {
        var factor = parseFloat(capas[i].getAttribute('data-parallax')) || 0;
        capas[i].style.transform = 'translate3d(0,' + (y * factor).toFixed(2) + 'px,0)';
      }
    }

    pendiente = false;
  }

  function pedirCuadro() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(alDesplazar);
  }

  window.addEventListener('scroll', pedirCuadro, { passive: true });
  window.addEventListener('resize', pedirCuadro);
  alDesplazar();

  /* ---------------------------------------------------------------
     Aparición progresiva, escalonada dentro de cada fila
     --------------------------------------------------------------- */
  if (!menosMovimiento && 'IntersectionObserver' in window) {
    var objetivos = document.querySelectorAll(
      '.card, .callout, .tabla-wrap, .acordeon, .encabezado-seccion, .preview, .panel'
    );

    Array.prototype.forEach.call(objetivos, function (el) {
      el.classList.add('reveal');
    });

    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        // Escalona según la posición del elemento dentro de su contenedor
        var hermanos = e.target.parentNode ? e.target.parentNode.children : [];
        var idx = Array.prototype.indexOf.call(hermanos, e.target);
        e.target.style.transitionDelay = Math.min(idx, 5) * 70 + 'ms';
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.04 });

    Array.prototype.forEach.call(objetivos, function (el) { obs.observe(el); });
  }
})();
