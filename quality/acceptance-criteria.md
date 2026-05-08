# Acceptance Criteria

## Criterios globales

1. El usuario puede completar el journey de inicio a export sin cuenta. [CONFIG]
2. La app explica privacidad local antes de capturar datos. [DOC]
3. La app base no sube informacion a servidores. [CONFIG]
4. El asistente Gemini solo llama una API externa cuando el usuario pega token propio desde pantalla. [CONFIG]
5. La salida BMAD/BMAP es util como input de pipeline posterior. [SUPUESTO]
6. El repo puede subirse completo a Hostinger sin build. [CONFIG]

## Criterios por estacion

1. Diagnostico: al menos una actividad produce score, recomendacion y cuadrantes. [CONFIG]
2. Debate: hay preguntas visibles aun sin datos y preguntas especificas con datos. [CONFIG]
3. Plan: los cinco campos persisten. [CONFIG]
4. Export: Markdown y JSON reflejan estado actual. [CONFIG]
5. Limpiar sesion: la app vuelve a estado inicial. [CONFIG]
6. Workshop: el stepper navega los ocho pasos y carga contexto del repo cuando el navegador lo permite. [CONFIG]
7. Gemini: sin token muestra bloqueo; con token genera payload y cambia estado a activo. [CONFIG]
8. Inicializacion IA: despues de cargar API key, el boton vitaminado carga contexto y produce comandos, prompts y checklist. [CONFIG]
9. Multimodal: los anexos TXT, MD, JSON, HTML, PDF e imagenes soportadas se clasifican con MIME, tipo y capacidad. [CONFIG]
10. Function calling: solo se ejecutan tools allowlisted y las desconocidas fallan cerradas. [CONFIG]
11. Seguridad: ningun export contiene API token ni patron de key. [CONFIG]

## Criterios de robustez documental

1. `documento-funcional.html` incluye indice, vision, usuario unico, journey, requisitos RF, Gemini BYOK, taller, aceptacion y trazabilidad. [CONFIG]
2. `documento-tecnico.html` incluye arquitectura, componentes, datos, Gemini, function calling, seguridad, resiliencia, observabilidad y pruebas. [CONFIG]
3. Specs y calidad referencian los mismos RF y TST que los HTML principales. [CONFIG]
