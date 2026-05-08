# Test Plan

## Alcance

Validar que la mini app estatica cumple el journey unico, no requiere login, persiste localmente, limpia sesion, exporta insumos BMAD/BMAP y activa Gemini multimodal solo cuando el usuario pega token desde pantalla. [CONFIG]

## Pruebas automatizables

| ID | Tipo | Objetivo | Evidencia |
| --- | --- | --- | --- |
| TST-SMOKE-001 | Smoke | Abrir `index.html` | Titulo y estaciones visibles |
| TST-LINK-001 | Integridad | Validar href/src locales | Sin links rotos |
| TST-HTML-001 | HTML | Confirmar cierre `</html>` | HTML validos |
| TST-JS-001 | Sintaxis | Parsear assets JS | `node --check` sin error |
| TST-SEC-001 | Seguridad basica | Revisar llamadas externas | Solo Gemini opcional en `assets/gemini-workshop.js` |
| TST-STOR-001 | Persistencia | Cargar demo y verificar `localStorage` | Estado guardado |
| TST-STOR-002 | Reset | Limpiar sesion | Estado borrado |
| TST-EXP-001 | Export MD | Generar Markdown | Contiene BMAD input |
| TST-EXP-002 | Export JSON | Generar JSON | Parseable y con diagnostico |
| TST-RESP-001 | Responsive | Screenshot desktop/mobile | Sin ruptura visible |

## Pruebas Workshop BMAD + Gemini

| ID | Tipo | Objetivo | Evidencia |
| --- | --- | --- | --- |
| TST-WORKSHOP-001 | UI | Abrir `workshop-bmad.html` y navegar stepper | Pasos visibles y activos |
| TST-BMAD-001 | Instalacion | Validar `bmm`, `bmb`, `tea`, `.agent/skills`, `.agents/skills` | Manifest y conteo de skills |
| TST-GEMINI-001 | Seguridad | Sin token no llama API; con token mock arma payload | Estado visible y sin secretos en repo |
| TST-GEMINI-002 | Multimodal | Cargar TXT, MD, JSON, HTML, PDF, PNG, JPG y WEBP | Partes texto e `inline_data` compatibles |
| TST-GEMINI-003 | Storage token | Guardar token por sesion y por opt-in local | Claves correctas en storage |
| TST-GEMINI-004 | Clear token | Borrar token desde UI | Claves Gemini ausentes y estado bloqueado |
| TST-GEMINI-005 | Imagen | Modo imagen construye prompt seguro | Incluye prohibicion de identificacion personal |
| TST-GEMINI-006 | Anexo | Modo anexo construye prompt de extraccion | Resume estructura, riesgos y criterios |
| TST-GEMINI-007 | Function declarations | Payload declara tools allowlisted | `functionDeclarations` presentes |
| TST-GEMINI-008 | Function response | Tool conocida ejecuta y retorna resultado | `executeToolCall` produce JSON |
| TST-GEMINI-009 | Tool desconocida | Rechazar nombre no allowlisted | Error controlado |
| TST-GEMINI-010 | Inicializacion IA | Click en `Vitamina e inicializa con IA` carga contexto y produce salida | Output con comandos, prompts y checklist; sin token queda bloqueado |
| TST-HANDOFF-001 | Export | Generar handoff MD/JSON | No contiene API token |
| TST-SEC-002 | Secret scanning | Buscar patrones de key | No aparece patron de API key Google |
| TST-RES-001 | Degradacion | Workshop sin token o sin contexto | App base sigue operando |
| TST-DEPLOY-001 | Deploy | Subir repo completo a Hostinger | Rutas relativas preservadas |

## Pruebas manuales de taller

1. Persona captura tres actividades reales. [DOC]
2. Persona cambia impacto y observa cambio de score. [CONFIG]
3. Persona responde una pregunta socratica. [DOC]
4. Persona define un no deliberado. [DOC]
5. Persona descarga Markdown y JSON. [CONFIG]
6. Persona pega token propio y confirma estado activo. [CONFIG]
7. Persona ejecuta `Vitamina e inicializa con IA` y revisa comandos/prompts generados. [CONFIG]
8. Persona carga un PDF o imagen y ejecuta modo anexo o imagen. [CONFIG]
9. Persona genera handoff workshop y verifica que no incluye token. [CONFIG]
10. Persona limpia token y sesion antes de entregar equipo o iniciar otro intento. [CONFIG]

## Criterio de salida

Todas las pruebas criticas pasan: smoke, links, JS, privacidad local, persistencia, export, reset, token BYOK, inicializacion IA, multimodalidad mock, function calling allowlisted, handoff sin secretos y rutas Hostinger. [CONFIG]
