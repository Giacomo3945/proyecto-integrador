# GECO | Gestión de Emergencias Comunitarias

## Integrantes
- Marangon Giacomo (Giacomo3945)
- Medina Nadia (nadiaamedina)
- Luna Constanza (conty-111)

## Descripción
GECO es un sistema web para la gestión y coordinación de emergencias comunitarias. Permite visualizar emergencias activas, recursos disponibles, refugios habilitados, voluntarios registrados y solicitudes de asistencia.

## Tecnologías utilizadas
- HTML5 (semántico)
- CSS3 (variables, Flexbox, Grid, Media Queries)
- Bootstrap 5.3.8
- Bootstrap Icons 1.13.1
- Git / GitHub

---

## TP3 — Refactorización con Bootstrap

### ¿Cómo incorporamos Bootstrap?
Vía CDN (jsDelivr), usando el snippet oficial de la documentación con los atributos `integrity` y `crossorigin` (SRI) para verificar la integridad de los archivos.

- El CSS se carga en el `<head>`, **antes** de `style.css`, para que nuestros estilos propios puedan sobreescribir los de Bootstrap.
- El JS (bundle) se carga antes del cierre de `</body>`, necesario para los componentes interactivos como el navbar colapsable.

### ¿Qué componentes de Bootstrap usamos?
| Componente | Dónde |
|---|---|
| Navbar (`navbar-expand-lg`, `navbar-toggler`) | Header, con menú hamburguesa responsive |
| Card (`card`, `card-body`, `card-title`, `card-text`) | Emergencias, Recursos, Refugios, Voluntarios, Estadísticas |
| Grid (`row`, `col`, `row-cols-*`, `g-3`) | Todas las secciones con tarjetas y la sección de Contacto |
| Formularios (`form-control`, `form-select`, `form-label`) | Solicitudes y Contacto |
| Alert (`alert alert-warning`) | Aviso de emergencia del 911 |
| Badge | Estados de emergencias, refugios, voluntarios y solicitudes |
| Utilidades (`d-flex`, `mt-*`, `text-center`, `gap-*`, `h-100`) | Footer, botones y alineación general |

### ¿Cómo personalizamos el diseño?
No usamos Bootstrap "tal cual viene": sobreescribimos sus estilos con nuestras variables CSS para mantener la identidad del proyecto.

- **Navbar**: rojo institucional en lugar del gris por defecto, con tipografía y espaciados propios.
- **Hero**: rediseñado con imagen de fondo, overlay para garantizar la legibilidad, indicador de estado del sistema y dos acciones (primaria y secundaria).
- **Badges de estado**: creamos clases propias con colores diferenciados según el estado (`badge-urgente`, `badge-en-curso`, `badge-finalizado`, `badge-activo`, `badge-casi-lleno`, `badge-disponible`, `badge-pendiente`, `badge-proceso`, `badge-atendida`).
- **Iconografía**: reemplazamos todos los emojis por Bootstrap Icons, unificados en el rojo institucional.
- **Botones**: colores propios y jerarquía visual (tamaño grande solo en el hero, que es la acción principal del sitio).

### CSS comentado
Como pide la consigna, el CSS puro que quedó reemplazado por Bootstrap **no se eliminó, se comentó**, dejando en cada bloque una nota que explica el motivo. Los bloques comentados son:
- Navegación del header (reemplazada por el navbar de Bootstrap)
- Flexbox del header y sus media queries
- Flexbox del footer
- Flexbox de las estadísticas

---

## TP2 — HTML y CSS

### ¿Dónde utilizamos Flexbox?
- **Hero**: para centrar el contenido vertical y horizontalmente.
- **Acciones del hero**: para distribuir los botones.
- **Alineación de badges**: para ubicarlos al pie de cada tarjeta.

### ¿Dónde utilizamos Grid?
- **Cards**: para mostrar las tarjetas en una cuadrícula adaptable (hoy resuelto con el grid de Bootstrap).
- **Contacto**: para distribuir información y formulario en columnas.

### ¿Qué variables CSS creamos?
- `--color-primario`: #c0392b (rojo institucional)
- `--color-secundario`: #2980b9 (azul de acción)
- `--color-fondo`: #f4f4f4 (gris claro)
- `--color-fondo-alt`: #ecf0f1 (gris más claro)
- `--color-fondo-oscuro`: #2c3e50 (azul oscuro)
- `--color-card-oscura`: #34495e
- `--color-texto`: #333333
- `--color-texto-claro`: #bdc3c7
- `--color-exito`: #27ae60 / `--color-alerta`: #f39c12 / `--color-info`: #3498db
- `--color-blanco`: #ffffff
- `--fuente-principal`: 'Segoe UI', Roboto, sans-serif
- `--espaciado-xs/sm/md/lg`: espaciados estándar
- `--radio-borde`: 8px
- `--sombra-suave/fuerte`: sombras para tarjetas

### ¿Cómo implementamos el Responsive Design?
- **Media Queries** propias para tablet (601-1024px) y celular (hasta 600px).
- **Clases responsive de Bootstrap**: `row-cols-1 row-cols-md-3`, `col-lg-6`, `navbar-expand-lg`.
- **Unidades flexibles**: `%`, `rem`, `vh`, `vw`, `fr`.
- El sitio se visualiza correctamente en celular, tablet y computadora.

### Estrategias de SEO
1. `lang="es"` — declara el idioma del documento para los buscadores.
2. `meta viewport` — SEO móvil: los buscadores priorizan sitios adaptables.
3. `meta description` — texto que aparece bajo el título en los resultados de búsqueda.
4. `meta keywords` y `meta author` — palabras clave del dominio y autoría del equipo.
5. **Open Graph** (`og:type`, `og:title`, `og:description`, `og:image`) — controlan cómo se ve el enlace al compartirlo en redes sociales.
6. **HTML semántico** (`header`, `nav`, `main`, `section`, `article`, `footer`) y jerarquía correcta de encabezados.

---

## Optimización
La imagen de fondo del hero se optimizó antes de subirla: redimensionada a 1920px y comprimida con MozJPEG, pasando de 5.7 MB a 209 kB (96% menos) sin pérdida visible de calidad.

## Links
- **Repositorio**: https://github.com/Giacomo3945/proyecto-integrador
- **Sitio publicado**: (pendiente de deploy en Netlify)