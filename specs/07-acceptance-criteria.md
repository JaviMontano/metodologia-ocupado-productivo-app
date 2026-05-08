# 07 Acceptance Criteria

## AC-001 Apertura

Given el repo esta descargado
When el usuario abre `index.html`
Then ve la app, disclaimer, estaciones y links a documentos. [CONFIG]

## AC-002 Diagnostico

Given existen actividades
When cambia horas, impacto, energia o interrupciones
Then el diagnostico se recalcula sin recargar. [CONFIG]

## AC-003 Export

Given hay sesion local
When el usuario genera export
Then Markdown y JSON contienen actividades, diagnostico, preguntas, decision y plan. [CONFIG]

## AC-004 Reset

Given hay datos guardados
When el usuario confirma Cerrar y limpiar sesion
Then `localStorage` queda limpio y la UI vuelve a cero. [CONFIG]

## AC-005 Gemini bloqueado sin token

Given el usuario abre `workshop-bmad.html`
When no ha pegado API token
Then el estado muestra Gemini bloqueado y no se ejecuta llamada externa. [CONFIG]

## AC-006 Activacion BYOK

Given el usuario pega su API token en pantalla
When activa o escribe el token
Then el estado cambia a activo y el token queda en `sessionStorage` por defecto. [CONFIG]

## AC-007 Multimodalidad

Given el usuario carga TXT, MD, JSON, HTML, PDF o imagen soportada
When revisa la lista de archivos
Then cada archivo muestra MIME, peso, tipo y capacidad de analisis. [CONFIG]

## AC-008 Function calling

Given Gemini responde con una function call allowlisted
When la app ejecuta `executeToolCall`
Then devuelve `functionResponse` y registra tool trace sin secretos. [CONFIG]

## AC-009 Handoff seguro

Given existe transcript, anexos o tool traces
When el usuario genera handoff workshop
Then Markdown y JSON no contienen API token ni secretos. [CONFIG]
