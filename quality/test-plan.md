# Test Plan

## Alcance

Validar que la mini app estatica cumple el journey unico, no requiere login, no llama APIs externas, persiste localmente, limpia sesion y exporta insumos BMAD/BMAP. [CONFIG]

## Pruebas automatizables

| ID | Tipo | Objetivo | Evidencia |
| --- | --- | --- | --- |
| TST-SMOKE-001 | Smoke | Abrir `index.html` | Titulo y estaciones visibles |
| TST-LINK-001 | Integridad | Validar href/src locales | Sin links rotos |
| TST-HTML-001 | HTML | Confirmar cierre `</html>` | 9 HTML validos |
| TST-JS-001 | Sintaxis | Parsear assets JS | `node --check` sin error |
| TST-SEC-001 | Seguridad basica | Buscar `fetch`, XHR, URLs externas | Sin llamadas externas operativas |
| TST-STOR-001 | Persistencia | Cargar demo y verificar `localStorage` | Estado guardado |
| TST-STOR-002 | Reset | Limpiar sesion | Estado borrado |
| TST-EXP-001 | Export MD | Generar Markdown | Contiene BMAD input |
| TST-EXP-002 | Export JSON | Generar JSON | Parseable y con diagnostico |
| TST-RESP-001 | Responsive | Screenshot desktop/mobile | Sin ruptura visible |

## Pruebas manuales de taller

1. Persona captura tres actividades reales.
2. Persona cambia impacto y observa cambio de score.
3. Persona responde una pregunta socratica.
4. Persona define un no deliberado.
5. Persona descarga Markdown y JSON.
6. Persona limpia sesion antes de entregar equipo o iniciar otro intento.

## Criterio de salida

Todas las pruebas criticas pasan: smoke, links, JS, privacidad local, persistencia, export y reset. [CONFIG]
## Pruebas Workshop BMAD + Gemini

| ID | Tipo | Objetivo | Evidencia |
| --- | --- | --- | --- |
| TST-WORKSHOP-001 | UI | Abrir `workshop-bmad.html` y navegar stepper | Pasos visibles y activos |
| TST-BMAD-001 | Instalacion | Validar `bmm`, `bmb`, `tea`, `.agent/skills`, `.agents/skills` | Manifest y conteo de skills |
| TST-GEMINI-001 | Seguridad | Sin token no llama API; con token mock arma payload | Sin secretos en repo |
| TST-GEMINI-002 | Multimodal | Cargar txt/md/json/html/pdf/png/jpg/webp | Partes texto e inline_data |
| TST-HANDOFF-001 | Export | Generar handoff MD/JSON | No contiene API token |
