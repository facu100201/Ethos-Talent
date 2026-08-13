# Ethos Talent — Sitio web (Componente A)

Maqueta funcional del sitio de **Ethos Talent**, plataforma ficticia de analítica predictiva
para selección de personal. Proyecto final de Ética Profesional, **Opción A**.

**Equipo:** Ana Karen López Jiménez · Fernando Acuña Martínez · Frida Sofía Escamilla Olguín ·
Pamela Ruíz Velasco

---

## Cómo abrirlo

Doble clic en `index.html`. No requiere instalación, servidor, conexión a internet ni
dependencias: es HTML, CSS y JavaScript puro. **Funciona con el wifi apagado**, lo cual importa
el día de la presentación.

### Cómo publicarlo en línea (opcional)

- **Netlify Drop** — entrar a `app.netlify.com/drop` y arrastrar la carpeta completa. Da una URL
  pública en segundos, sin cuenta.
- **GitHub Pages** — subir la carpeta a un repositorio y, en *Settings → Pages*, elegir la rama
  principal y la carpeta raíz.

---

## Estructura

```
EticaFinal/
├── index.html        Inicio — fin triple, cifras con margen de error, límites del objeto
├── servicios.html    Los tres módulos + cómo se entrena + los 8 riesgos previsibles
├── demo.html         Motor interactivo con explicabilidad y prueba de impacto adverso
├── precios.html      Los 6 criterios de precio, calculadora abierta, desglose de costos, SLA
├── privacidad.html   Inventario de datos, derechos del candidato, protocolo de 9 pasos
├── etica.html        Compromiso Ético: autopsia del acto moral y matriz de phrónesis
└── assets/
    ├── css/style.css     Sistema de diseño completo (tokens, componentes, patrones)
    ├── js/main.js        Navegación, acordeones, parallax, barra de progreso
    ├── js/pricing.js     Calculadora de precios (fórmula visible y comentada)
    ├── js/demo.js        Motor de scoring, conclusión ejecutiva y auditoría de sesgo
    └── img/logo.svg      Logotipo
```

---

## Mapeo sitio ↔ Componente B (documento de justificación filosófica)

Cada apartado del documento tiene un lugar visible en el sitio. Esta tabla sirve de guion para
el **Componente C (pitch de 10 minutos)**.

| Apartado del documento | Dónde se ve en el sitio |
|---|---|
| **1.1 Objeto** — qué hace el software | `etica.html` → tarjeta «El objeto» · `servicios.html` → los tres módulos con la estructura *qué usa / qué no usa / quién decide / cómo se impugna* |
| **1.2 Fin** — para qué se creó | `index.html` → «Nuestro propósito no es la velocidad» (fin triple) · `etica.html` → tarjeta «El fin» |
| **1.3 Circunstancias** — riesgos de mal uso | `servicios.html` → tabla «Ocho riesgos previsibles y sus controles» |
| **2.1 Criterios de precio justo** | `precios.html` → «Seis criterios, y ninguno más» + calculadora abierta |
| **2.2 Prohibición de prácticas abusivas** | `precios.html` → «Prácticas que nos prohibimos por contrato» + «Lo que nunca sube el precio» |
| **2.3 SLA y reciprocidad** | `precios.html` → «Compensación por incumplimiento» |
| **3.1 Naturaleza del secreto profesional** | `privacidad.html` → «Fundamento del deber de confidencialidad» (los cinco fundamentos) |
| **3.2 Límites del secreto** | `privacidad.html` → «Límites del secreto profesional» (los seis supuestos) |
| **3.3 Protocolo ético** | `privacidad.html` → «Nueve pasos, en este orden» (carrusel) |
| **Veracidad** | `index.html` → cifras con margen de error y «Lo que nunca vamos a prometer» · `etica.html` → «Lo que aún no resolvemos» |
| **4. Matriz de phrónesis — Dilema 1** | `etica.html#phronesis` → acordeón «Un cliente pide excluir por edad o género» |
| **4. Matriz de phrónesis — Dilema 2** | `etica.html#phronesis` → acordeón «El modelo acierta más, pero usa variables proxy» **y su demostración en vivo** en `demo.html` |
| **Conclusión** — mediadores responsables | Pie de página de todas las páginas |

---

## Guion sugerido para el pitch (10 minutos)

1. **`index.html` (1.5 min)** — Abrir con el fin triple: no vendemos velocidad, sino reducción
   de arbitrariedad. Señalar las cifras **con su margen de error** y el bloque «Lo que nunca
   vamos a prometer».
2. **`servicios.html` (1.5 min)** — Mostrar la estructura repetida de los tres módulos y
   detenerse en la tabla «Ocho riesgos previsibles y sus controles»: es la autopsia del acto
   moral convertida en producto.
3. **`demo.html` (3 min — la sección central del pitch)**
   - Cambiar una casilla de experiencia o formación y leer la **conclusión ejecutiva**, que se
     redacta sola y cierra recordando que la decisión corresponde al reclutador y a RRHH.
   - Pulsar **«Añadir pausa de 18 meses»**: el resultado *no cambia*. Es la prueba operativa de
     que no se penalizan trayectorias marcadas por cuidados o enfermedad.
   - Bajar a la prueba de sesgo y activar **«Premiar el prestigio de la universidad»**: el
     índice cae de 0.97 a 0.70 y **la exportación queda bloqueada**. El Dilema 2 se muestra en
     funcionamiento, no solo narrado.
4. **`precios.html` (2 min)** — La calculadora sin registro, el desglose de en qué se va cada
   peso facturado, y el SLA cuyo tercer renglón compensa a un **candidato**, que no es quien
   paga.
5. **`privacidad.html` (1 min)** — Recorrer el carrusel del protocolo, subrayando el paso 7:
   ante un riesgo grave, la continuidad del contrato cede frente al deber de actuar.
6. **`etica.html` (1 min)** — Cerrar en «Lo que aún no resolvemos». Las tres limitaciones
   abiertas son la mejor defensa frente a la acusación de *ethics washing*.

### Preguntas probables del comité y dónde está la respuesta

| Pregunta | Respuesta en el sitio |
|---|---|
| «¿Y si el cliente lo usa para discriminar?» | `servicios.html` → tabla de riesgos · `privacidad.html#protocolo` → los 9 pasos |
| «¿Cómo garantizan que el precio es justo?» | `precios.html` → seis criterios + desglose de costos + tarifa social |
| «Su modelo es menos preciso que el de la competencia» | `servicios.html` → ficha del modelo: se elige interpretabilidad sobre exactitud, y se declara |
| «¿No es esto solo marketing ético?» | `demo.html` → el bloqueo está en el código, no en el texto · `etica.html#pendientes` |
| «¿Qué gana el candidato, que no les paga?» | `privacidad.html#derechos` + tercer renglón del SLA |
| «¿Piden el título universitario? ¿No es eso un privilegio?» | Se pregunta *si* hay título, nunca *cuál* institución; las certificaciones suman por su cuenta (`servicios.html`, `demo.html`) |

---

## Notas técnicas

- **Sin dependencias externas.** Nada de CDN, fuentes remotas ni librerías. Un fallo de red no
  puede interrumpir la demostración.
- **Siempre en tonos claros.** El sitio declara `color-scheme: light` y no sigue la preferencia
  de modo oscuro del sistema, para que se vea igual en cualquier computadora.
- **Accesibilidad**: navegable por teclado, contraste AA verificado en los 22 pares de texto,
  `aria-*` en menú, acordeones, carruseles y demo, y respeto a `prefers-reduced-motion`. Es
  también un argumento del pitch: una empresa que discrimina en su propia web no puede alegar
  no-discriminación en su algoritmo.
- **Cinco patrones de composición** (lista numerada, franja de datos, pasos conectados, bento y
  carrusel) para que ninguna página repita la misma retícula.
- **Las fórmulas del demo y de la calculadora están comentadas en el código**, sin ofuscar,
  porque el sitio afirma que son auditables.
- **Registro formal y uniforme** en las seis páginas: trato de usted o impersonal, sin
  coloquialismos.
- Todos los datos, cifras, clientes y perfiles son **ficticios**, generados para este ejercicio
  académico.
