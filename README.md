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
- **GitHub Pages** — subir la carpeta a un repositorio, y en *Settings → Pages* elegir la rama
  principal y la carpeta raíz.

---

## Estructura

```
EticaFinal/
├── index.html        Home — fin triple, cifras con margen de error, límites del objeto
├── servicios.html    Los tres módulos + cómo se entrena + las 8 circunstancias de riesgo
├── demo.html         Motor interactivo con explicabilidad y prueba de impacto adverso
├── precios.html      Los 6 criterios de precio, calculadora abierta, desglose de costos, SLA
├── privacidad.html   Inventario de datos, derechos del candidato, protocolo de 9 pasos
├── etica.html        Compromiso Ético: autopsia del acto moral y matriz de phrónesis
└── assets/
    ├── css/style.css     Sistema de diseño completo (tokens, componentes, modo oscuro)
    ├── js/main.js        Navegación, acordeones, animación de entrada
    ├── js/pricing.js     Calculadora de precios (fórmula visible y comentada)
    ├── js/demo.js        Motor de scoring + auditoría de sesgo
    └── img/logo.svg      Logotipo
```

---

## Mapeo sitio ↔ Componente B (documento de justificación filosófica)

Cada apartado del documento tiene un lugar visible en el sitio. Esta tabla sirve de guion para
el **Componente C (pitch de 10 minutos)**.

| Apartado del documento | Dónde se ve en el sitio |
|---|---|
| **1.1 Objeto** — qué hace el software | `etica.html` → tarjeta «Objeto» · `servicios.html` → los tres módulos con la estructura *qué usa / qué no usa / quién decide / cómo se impugna* |
| **1.2 Fin** — para qué se creó | `index.html` → «No creamos esto para acelerar contrataciones» (fin triple) · `etica.html` → tarjeta «Fin» |
| **1.3 Circunstancias** — riesgos de mal uso | `servicios.html` → tabla «Ocho formas en que esto podría corromperse», con el control aplicado a cada riesgo |
| **2.1 Criterios de precio justo** | `precios.html` → «Seis criterios, y ninguno más» + calculadora abierta |
| **2.2 Prohibición de prácticas abusivas** | `precios.html` → «Prácticas que nos prohibimos por contrato» + «Lo que jamás entra en el precio» |
| **2.3 SLA y reciprocidad** | `precios.html` → tabla de SLA con compensación automática |
| **3.1 Naturaleza del secreto profesional** | `privacidad.html` → «Sobre qué se funda nuestro deber de callar» (los cinco fundamentos) |
| **3.2 Límites del secreto** | `privacidad.html` → «El secreto no obliga a encubrir» (los seis supuestos) |
| **3.3 Protocolo ético** | `privacidad.html` → «Nueve pasos, en este orden» |
| **Veracidad** | `index.html` → cifras con margen de error y «Lo que nunca vamos a prometerte» · `etica.html` → «Lo que aún no resolvemos» |
| **4. Matriz de phrónesis — Dilema 1** | `etica.html#phronesis` → acordeón «Un cliente pide excluir candidatos por edad o género» |
| **4. Matriz de phrónesis — Dilema 2** | `etica.html#phronesis` → acordeón «El modelo es más preciso, pero usa variables proxy» **y su demostración en vivo** en `demo.html` |
| **Conclusión** — mediadores responsables | Tagline del pie de página en todas las páginas |

---

## Guion sugerido para el pitch (10 minutos)

1. **`index.html` (1.5 min)** — Abrir con el fin triple: no vendemos velocidad, vendemos
   reducción de arbitrariedad. Señalar las cifras **con margen de error** y el bloque «Lo que
   nunca vamos a prometerte».
2. **`servicios.html` (1.5 min)** — Mostrar la estructura repetida de los tres módulos y
   detenerse en la tabla de las ocho circunstancias de riesgo: es la autopsia del acto moral
   convertida en producto.
3. **`demo.html` (3 min — el momento fuerte)**
   - Mover un slider y mostrar cómo cambia la explicación variable por variable.
   - Pulsar **«Añadir pausa laboral de 18 meses»**: el resultado *no cambia*. Es la prueba
     operativa de que no castigamos trayectorias marcadas por cuidados o enfermedad.
   - Bajar a la auditoría y activar **«Incluir universidad de origen»**: el índice cae de 0.97
     a 0.70 y **la exportación se bloquea sola**. Ahí está el Dilema 2 funcionando, no narrado.
4. **`precios.html` (2 min)** — La calculadora sin registro, el desglose de en qué se va cada
   peso, y el SLA cuyo tercer renglón compensa a un **candidato**, que no es quien paga.
5. **`privacidad.html` (1 min)** — Los nueve pasos del protocolo, subrayando el paso 7:
   «antes de perder el contrato, se pierde el silencio».
6. **`etica.html` (1 min)** — Cerrar en «Lo que aún no resolvemos». Las tres limitaciones
   abiertas son la mejor defensa contra la acusación de *ethics washing*.

### Preguntas probables del comité y dónde está la respuesta

| Pregunta | Respuesta en el sitio |
|---|---|
| «¿Y si el cliente lo usa para discriminar?» | `servicios.html` → tabla de circunstancias · `privacidad.html` → protocolo de 9 pasos |
| «¿Cómo garantizan que el precio es justo?» | `precios.html` → seis criterios + desglose de costos + tarifa social |
| «Su modelo es menos preciso que la competencia» | `servicios.html` → ficha del modelo: elegimos interpretabilidad sobre exactitud, y lo decimos |
| «¿No es esto solo marketing ético?» | `demo.html` → el bloqueo es código, no copy · `etica.html#pendientes` |
| «¿Qué gana el candidato, que no les paga?» | `privacidad.html#derechos` + tercer renglón del SLA |

---

## Notas técnicas

- **Sin dependencias externas.** Nada de CDN, fuentes remotas ni librerías. Un fallo de red no
  puede romper la demostración.
- **Accesibilidad**: navegable por teclado, contraste AA, `aria-*` en menú, acordeones y demo,
  y respeto a `prefers-reduced-motion`. Es también un argumento del pitch: una empresa que
  discrimina en su propia web no puede alegar no-discriminación en su algoritmo.
- **Modo oscuro** automático según la preferencia del sistema.
- **La fórmula del demo y la de precios están comentadas en el código**, sin ofuscar, porque el
  sitio afirma que son auditables.
- Todos los datos, cifras, clientes y perfiles son **ficticios**, generados para este ejercicio
  académico.
