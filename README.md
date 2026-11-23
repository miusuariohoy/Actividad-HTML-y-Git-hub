# 📚 Plataforma Web Docente: Guía y Desafío de Desarrollo Web Inicial

Todo el material está en **un solo repositorio** y se publica con GitHub Pages en:

**https://miusuariohoy.github.io/Actividad-HTML-y-Git-hub/**

Diseñado por **la Profesora Alejandra Moreira**.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `index.html` | Hub principal: guías, teoría, 4 actividades corregibles, práctica guiada, CSS con IA, publicación y entrega del sitio web. |
| `imagenes-tablas/` | Guía integrada de imágenes y tablas (7 ejercicios + entrega). |
| `formularios/` | Guía integrada de formularios (4 ejercicios + entrega). |
| `estilos.css` | Hoja de estilos roja única, compartida por las tres páginas. |
| `scripts/ejercicios.js` | Utilidades y corrección compartidas por los 15 ejercicios. |
| `scripts/entrega.js` | Envío cifrado de las tres entregas al repositorio privado `inform`. |

Las guías que antes estaban en los repositorios `HTMLTablas` y `HTMLForm` ahora viven dentro de este repo, así que ya no hay que mantener tres sitios distintos.

## Las tres entregas

Todas van al repositorio privado `inform`, sin nota, dentro de «Entregas de links (sin nota)»:

| Entrega | `id` del examen |
| --- | --- |
| Imágenes y tablas | `entrega-html-imagenes-tablas` |
| Formularios | `entrega-html-formularios` |
| Sitio web | `entrega-html-sitio-web` |

Se usan los mismos topic y par de claves que el resto de las evaluaciones; el contenido viaja cifrado (RSA-OAEP + AES-GCM).

## Publicación (para el docente)

1. Este repo ya tiene GitHub Pages activo en la rama `main`, carpeta `/(root)`.
2. Para actualizar el sitio alcanza con hacer `git push` a `main`.
3. La URL pública no cambia; las guías se abren como subcarpetas del mismo sitio.
