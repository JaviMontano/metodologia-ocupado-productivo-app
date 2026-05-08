# 02 Technical Spec

## Runtime

HTML, CSS y JavaScript plano ejecutados por navegador. No hay build ni dependencias externas obligatorias para la app base. La unica llamada externa es opcional: Gemini `generateContent` cuando el usuario pega token en `workshop-bmad.html`. [CONFIG]

## Componentes

| Componente | Responsabilidad |
| --- | --- |
| `index.html` | UI principal y estaciones de diagnostico. [CONFIG] |
| `workshop-bmad.html` | Stepper BMAD, token Gemini, modos multimodales, handoff y controles de seguridad. [CONFIG] |
| `assets/styles.css` | Sistema visual oscuro MetodologIA, documentos robustos y workshop. [CONFIG] |
| `assets/storage.js` | Adaptador de `localStorage` para app base. [CONFIG] |
| `assets/diagnostic-engine.js` | Calculo deterministico del diagnostico. [CONFIG] |
| `assets/exporters.js` | Markdown, JSON y descarga local. [CONFIG] |
| `assets/app.js` | Binding DOM, render y eventos de app base. [CONFIG] |
| `assets/gemini-workshop.js` | Token manager, carga multimodal, Gemini REST, function calling local y handoff. [CONFIG] |
| `data/questions.json` | Banco de preguntas de referencia. [CONFIG] |
| `data/rubrics.json` | Rubricas impacto/energia/tipo. [CONFIG] |

## Persistencia

| Clave | Storage | Contenido | Exportable |
| --- | --- | --- | --- |
| `metodologia.ocupadoProductivo.session.v1` | `localStorage` | Actividades, decision, plan y timestamp | Si |
| `metodologia.gemini.apiToken.session` | `sessionStorage` | Token Gemini temporal | No |
| `metodologia.gemini.apiToken.local` | `localStorage` opt-in | Token recordado por decision explicita | No |

## Gemini BYOK

El cliente usa REST contra `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}`. El modelo default es `gemini-2.5-flash` y puede editarse en pantalla. [CONFIG]

Google documenta que una API key puede proveerse explicitamente en entornos web para REST, pero advierte que no se debe exponer una key real en cliente para produccion. Por eso este repo declara el patron como academico BYOK y exige validacion server-side antes de produccion. [DOC]

## Entrada multimodal

| Tipo | MIME | Tratamiento |
| --- | --- | --- |
| Texto | `text/plain`, `text/markdown`, `application/json`, `text/html` | Se agrega como parte `text` con truncado defensivo. [CONFIG] |
| PDF | `application/pdf` | Se agrega como `inline_data` para entendimiento de documentos. [DOC] |
| Imagen | `image/png`, `image/jpeg`, `image/webp` | Se agrega como `inline_data` para vision. [DOC] |
| Otro | Cualquier otro | Se clasifica como no soportado. [CONFIG] |

## Function calling

`assets/gemini-workshop.js` declara estas funciones allowlisted y ejecuta solamente sus nombres exactos. [CONFIG]

| Funcion | Tipo | Efecto |
| --- | --- | --- |
| `get_diagnostic_snapshot` | Read-only | Lee estado local y diagnostico. |
| `classify_uploaded_annexes` | Read-only | Retorna metadata y capability de archivos cargados. |
| `build_bmad_handoff` | Local export | Construye handoff MD/JSON sin secretos. |
| `summarize_workshop_context` | Read-only | Resume documentos del repo cargados por fetch relativo. |
| `clear_gemini_token` | Mutacion controlada | Borra claves Gemini si `confirm=true`. |

Flujo tecnico: construir payload con `contents`, `generationConfig`, `tools.functionDeclarations`; recibir texto o `functionCall`; ejecutar tool local; enviar `functionResponse`; renderizar respuesta final. [CONFIG]

## Seguridad tecnica

1. No hay token hardcoded ni variables de secreto en repo. [CONFIG]
2. El token no entra en handoff, app export, tool trace visible ni archivos generados. [CONFIG]
3. El modo imagen prohibe identificacion de personas e inferencias sensibles. [SUPUESTO]
4. Tools desconocidas fallan cerradas. [CONFIG]
5. La app base funciona sin internet y sin Gemini. [CONFIG]
6. La llamada externa opcional queda aislada en `assets/gemini-workshop.js`. [CONFIG]

## Compatibilidad

Navegadores modernos con soporte de `localStorage`, `sessionStorage`, `FileReader`, `Blob`, `URL.createObjectURL`, `fetch` y JavaScript ES6. Para operar sin Gemini, `fetch` solo afecta carga de contexto del repo en workshop. [CONFIG]

## Errores esperados

| Falla | Resultado |
| --- | --- |
| Sin token | No hay llamada externa y se muestra bloqueo. |
| Token invalido, cuota o red | Se captura error HTTP y se muestra mensaje acotado. |
| Archivo no soportado | Se lista como no soportado y no viaja al payload. |
| PDF grande | Puede degradar por latencia o limite; version productiva evaluaria Files API. |
| Function call desconocida | Se rechaza por allowlist. |
