# 01 Functional Spec

## Proposito

Convertir la practica De Ocupado a Productivo en una mini app estatica que diagnostica uso del tiempo, guia debate socratico, produce plan semanal y exporta insumos BMAD/BMAP. [DOC]

## Actor

Existe un unico actor: usuario diagnostico de tiempo. Puede ser estudiante, profesional, facilitador o participante de taller, pero no hay roles, permisos ni login diferenciados. [DOC]

## Modos funcionales

| Modo | Disponibilidad | Capacidades |
| --- | --- | --- |
| Local deterministico | Siempre | Captura, diagnostico, debate, plan, export y reset. [CONFIG] |
| Workshop BMAD | Siempre | Stepper, comandos, docs locales y handoff. [CONFIG] |
| Gemini BYOK | Solo con token pegado en UI | Chat, inicializacion IA, multimodalidad, imagenes, anexos y function calling local. [CONFIG] |

## Requisitos funcionales

| ID | Requisito | Criterio observable | Prueba |
| --- | --- | --- | --- |
| RF-001 | Abrir sin login | `index.html` permite iniciar sin credenciales | TST-SMOKE-001 |
| RF-002 | Ver aviso de privacidad local | Disclaimer visible en home, documentos y workshop | TST-PRIV-001 |
| RF-003 | Registrar actividades | El usuario captura nombre, horas, impacto, energia, tipo e interrupciones | TST-FUNC-001 |
| RF-004 | Persistir sesion | Recargar conserva actividades en `localStorage` | TST-STOR-001 |
| RF-005 | Diagnosticar | El sistema calcula score y tarjetas de diagnostico | TST-ENG-001 |
| RF-006 | Mapear tiempo | El sistema ubica actividades en cuadrantes impacto/energia | TST-ENG-002 |
| RF-007 | Debatir socraticamente | El sistema muestra preguntas segun diagnostico | TST-FUNC-002 |
| RF-008 | Planificar semana | El usuario registra prioridad, deep work, batch, buffer y no deliberado | TST-FUNC-003 |
| RF-009 | Exportar Markdown | Descarga `bmad-input.md` con diagnostico y plan | TST-EXP-001 |
| RF-010 | Exportar JSON | Descarga `bmap-session.json` parseable | TST-EXP-002 |
| RF-011 | Limpiar sesion | Boton borra almacenamiento local y reinicia UI | TST-STOR-002 |
| RF-012 | Abrir workshop guiado | `workshop-bmad.html` aparece en la navegacion | TST-WORKSHOP-001 |
| RF-013 | Instalar BMAD | `_bmad/_config/manifest.yaml` contiene `bmm`, `bmb`, `tea`, `antigravity` y `codex` | TST-BMAD-001 |
| RF-014 | Activar Gemini desde pantalla | Input de token cambia estado del asistente a activo | TST-GEMINI-001 |
| RF-015 | Guardar token en navegador | Usa `sessionStorage` por defecto y `localStorage` solo por opt-in | TST-GEMINI-003 |
| RF-016 | Borrar token | Boton borra claves Gemini y vuelve a estado bloqueado | TST-GEMINI-004 |
| RF-017 | Cargar archivos multimodales | TXT, MD, JSON, HTML, PDF e imagenes aparecen clasificados | TST-GEMINI-002 |
| RF-018 | Analizar imagenes | Modo imagen solicita descripcion visible, texto y relacion con productividad | TST-GEMINI-005 |
| RF-019 | Analizar anexos | Modo anexo resume estructura, hallazgos, riesgos y requisitos | TST-GEMINI-006 |
| RF-020 | Declarar function calling | Payload incluye `functionDeclarations` allowlisted | TST-GEMINI-007 |
| RF-021 | Ejecutar tools locales | Function call conocida produce `functionResponse` | TST-GEMINI-008 |
| RF-022 | Rechazar tools desconocidas | Function call no allowlisted genera error controlado | TST-GEMINI-009 |
| RF-023 | Generar handoff workshop | Markdown y JSON contienen transcript, archivos, tool traces y app state | TST-HANDOFF-001 |
| RF-024 | Excluir secretos de exports | Handoff no contiene token ni patron de API key | TST-SEC-002 |
| RF-025 | Degradar sin token o sin red | App base sigue operando y workshop explica bloqueo | TST-RES-001 |
| RF-026 | Desplegar como repo estatico | Hostinger sirve el repo sin build ni backend | TST-DEPLOY-001 |
| RF-027 | Vitaminar e inicializar entorno con IA | Con token activo, el boton carga contexto, usa modo tools y genera arranque BMAD/Antigravity/Codex | TST-GEMINI-010 |

## Invariantes

1. La app base no requiere autenticacion. [CONFIG]
2. La misma entrada produce el mismo diagnostico. [CONFIG]
3. La exportacion refleja el estado visible de la sesion. [CONFIG]
4. El reset de app no debe borrar archivos del repo, solo estado del navegador. [CONFIG]
5. El token Gemini nunca se escribe en archivos, exports, transcript descargable como secreto ni commits. [CONFIG]
6. Gemini no debe operar sin token pegado por el usuario. [CONFIG]
7. El flujo de taller debe comenzar por cargar API key y luego inicializar el entorno con IA. [CONFIG]

## Reglas de imagenes y anexos

1. Imagenes: permitir descripcion de contenido visible, texto, objetos, diagramas y relacion con el diagnostico. [DOC]
2. Imagenes: prohibir identificacion de personas, inferencias sensibles y diagnosticos medicos, legales o laborales. [SUPUESTO]
3. PDFs y anexos: resumir estructura, hallazgos, criterios, riesgos y entrada BMAD/BMAP. [DOC]
4. Archivos no soportados: clasificar como degradado sin prometer analisis. [CONFIG]
