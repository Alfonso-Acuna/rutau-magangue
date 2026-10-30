# RutaU Magangué — Contexto de la página

Sitio web de una sola página que presenta **RutaU Magangué**, un sistema digital de movilidad universitaria rural para conectar a estudiantes de corregimientos de Magangué, Bolívar, con el Centro Tutorial de la Universidad de Cartagena.

- **Sitio publicado:** https://alfonso-acuna.github.io/rutau-magangue/
- **Repositorio:** https://github.com/Alfonso-Acuna/rutau-magangue
- **Tipo:** landing page infográfica, estática y responsive.
- **Estado:** publicado con GitHub Pages.

## Objetivo

Comunicar de forma clara, visual y emotiva el problema de movilidad que enfrentan los estudiantes rurales y presentar a RutaU como una solución digital gratuita, sostenible e institucional.

La página busca transmitir tres ideas principales:

1. La información de transporte dispersa genera esperas, sobrecostos y ausentismo.
2. RutaU centraliza rutas, paradas, horarios y alertas en una sola aplicación.
3. El modelo es 100 % gratuito para el estudiante y se sostiene con alianzas institucionales.

## Público objetivo

- Estudiantes universitarios de corregimientos y sectores alejados de Magangué.
- Docentes, personal administrativo y conductores.
- Universidad de Cartagena, Alcaldía de Magangué, Gobernación de Bolívar y aliados locales.
- Comunidad académica y jurados de presentación del proyecto.

## Estructura narrativa

La página se organiza en siete bloques:

### 1. Hero

- Nombre: **RutaU Magangué**.
- Tagline: “Sistema inteligente de movilidad universitaria rural”.
- Mensaje: “Conectando estudiantes, comunidades y oportunidades”.
- Estadísticas destacadas: 4 módulos integrados, 7 hitos de implementación y 100 % gratuito para el estudiante.
- Ilustración SVG animada con buseta, ruta, corregimientos y Campus UDC.
- Tarjeta de ruta activa: **Ceibal → Campus UDC**.

### 2. El desafío

Contrasta la situación actual con la solución:

- Información dispersa entre llamadas, mensajes y rumores.
- Largas esperas sin certeza sobre la llegada de la buseta.
- Incertidumbre de horarios y rutas hacia el Centro Tutorial.
- RutaU centraliza rutas, paradas y horarios y conecta los corregimientos con el casco urbano.

### 3. Propuesta de valor

- Planificar el viaje con anticipación para reducir tiempos de espera, costos y ausentismo escolar.
- Usuario principal: estudiantes universitarios rurales.
- Usuarios secundarios: docentes, personal administrativo, conductores y entidades municipales y universitarias.

### 4. Experiencia digital

Presenta cuatro pantallas de la aplicación móvil, maquetadas en HTML y CSS:

1. **Inicio:** selección de corregimiento y sede.
2. **Mapa de rutas:** origen, paradas y destino.
3. **Horarios:** salida, llegada y regreso.
4. **Alertas:** cambios, retrasos y suspensión del servicio.

Incluye además un panel web administrativo de ejemplo con rutas, paradas, alertas, gráfico de viajes y reportes comunitarios.

### 5. Hoja de ruta

Timeline interactivo con siete hitos:

1. Investigación.
2. Diseño.
3. Prototipo.
4. Prueba piloto.
5. Alianzas.
6. Implementación.
7. Crecimiento, con rastreo GPS y analítica de datos.

### 6. Modelo social e impacto

- Modelo híbrido social: **100 % gratuito para el estudiante**.
- Financiación mediante convenios institucionales, Alcaldía de Magangué, Gobernación de Bolívar, Universidad de Cartagena y patrocinios locales.
- Impacto social y educativo: más asistencia y permanencia académica.
- Impacto económico: menos gasto de transporte para las familias.
- Impacto tecnológico e institucional: mayor articulación territorial.

### 7. Cierre

- Cita inspiracional: “Un estudiante que sabe a qué hora pasa su buseta es un estudiante que llega. Y un estudiante que llega es un estudiante que se gradúa”.
- Instituciones aliadas: Universidad de Cartagena, Centro Tutorial Magangué y CIPA ADyEM.
- Créditos: Universidad de Cartagena — Administración y Emprendimiento, Semestre 8, CIPA ADyEM.
- Enlaces de navegación, volver arriba y año dinámico.

## Funcionalidades interactivas

- Barra de progreso de lectura.
- Header fijo con cambio de estilo al hacer scroll.
- Menú móvil accesible.
- Navegación lateral de puntos en escritorio.
- Animaciones de aparición con `IntersectionObserver`.
- Contadores animados.
- Inclinación suave de la ilustración del hero con el puntero.
- Timeline horizontal navegable con botones, teclado, arrastre y contador `01 / 07`.
- Enlaces internos con desplazamiento suave.
- Botón flotante para volver arriba.
- Soporte para `prefers-reduced-motion`.

## Identidad visual

- **Azul principal:** `#004B87`.
- **Verde:** `#10B981`.
- **Naranja:** `#F97316`.
- **Fondos claros:** `#FFFFFF`, `#F8FAFC`.
- **Tipografía de títulos:** Sora.
- **Tipografía de cuerpo:** Manrope.
- Estilo: institucional, fresco, tecnológico y cercano al contexto rural.

## Stack técnico

- HTML5 semántico.
- CSS3 con variables, Grid, Flexbox, animaciones y media queries.
- JavaScript vanilla, sin dependencias ni frameworks.
- SVG inline para iconos e ilustraciones.
- Google Fonts.
- GitHub Pages como hosting estático.

## Archivos

```text
RutaU/
├── index.html          # Contenido y estructura de la página
├── styles.css          # Diseño, animaciones y responsive
├── script.js           # Interacciones y comportamiento dinámico
├── assets/
│   └── favicon.svg     # Favicon del sitio
├── .nojekyll           # Evita el procesamiento de Jekyll en GitHub Pages
└── README.md           # Este documento de contexto
```

## Ejecución local

Al ser un sitio estático no requiere instalación ni compilación. Puede abrirse directamente `index.html` o servirse con cualquier servidor local:

```bash
python -m http.server 8000
```

Luego abrir:

```text
http://localhost:8000
```

## Despliegue

GitHub Pages está configurado desde la rama `main`, carpeta raíz (`/`). Cada push a `main` actualiza automáticamente el sitio publicado.

## Accesibilidad y SEO

- Estructura semántica con `header`, `nav`, `main`, `section`, `footer` y `blockquote`.
- Enlace para saltar al contenido.
- Etiquetas ARIA en navegación, controles y regiones interactivas.
- Foco visible y navegación por teclado.
- Textos alternativos y descripciones en SVG relevantes.
- Metadatos de título, descripción, autor y Open Graph.
- Diseño responsive probado en escritorio, tablet y móvil.
- Respeto por la preferencia de movimiento reducido.

## Notas de contenido

- El corregimiento usado en el prototipo es **Ceibal**, no “San Antonio”.
- El destino institucional se escribe **Campus UDC**, no “UC”.
- El centro de prácticas se menciona como **Centro Tutorial Magangué** o **Centro Tutorial de la Universidad de Cartagena**, según el contexto.
- Las cifras del panel administrativo son datos de ejemplo para la demostración visual.

## Créditos

Proyecto académico de movilidad universitaria rural.

**Universidad de Cartagena — Administración y Emprendimiento**  
Semestre 8 · CIPA ADyEM  
Magangué, Bolívar, Colombia.
