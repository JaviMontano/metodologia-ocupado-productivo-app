# Hostinger Deploy Guide

## Supuesto de despliegue

El despliegue es manual: subir archivos del repo completo por File Manager o FTP. La app no realiza upload ni automatiza Hostinger. [SUPUESTO]

## Pasos

1. Abrir el panel de Hostinger.
2. Ir a File Manager.
3. Entrar a `public_html` o crear una subcarpeta.
4. Subir `index.html`, `documento-funcional.html`, `documento-tecnico.html` y todas las carpetas.
5. Confirmar que `assets/`, `data/`, `prototipos/`, `journeys/`, `specs/`, `quality/` y `bmap/` quedaron al mismo nivel relativo.
6. Abrir la URL publica y ejecutar el demo.

## Validacion post subida

1. La home carga sin login.
2. Los estilos cargan.
3. El boton Cargar demo produce diagnostico.
4. Export Markdown y JSON descarga archivos.
5. Cerrar y limpiar sesion reinicia el estado.
6. Documento funcional, documento tecnico y prototipos abren desde navegacion.
## Workshop BMAD y Gemini en Hostinger

Subir tambien `workshop-bmad.html`, `assets/gemini-workshop.js`, `assets/logo-metodologia.svg`, `_bmad/`, `.agent/`, `.agents/` y `docs/bmad-workshop-help.md` si el objetivo es que el estudiante revise el metodo completo desde el hosting. [CONFIG]

La app base sigue funcionando sin internet. El chatbot multimodal solo llama Gemini si el usuario pega su propio token de Google AI Studio. [CONFIG]
