# 01 Functional Spec

## Actores

Existe un unico actor: usuario diagnostico de tiempo. Puede ser estudiante, profesional o participante de taller. [DOC]

## Requisitos funcionales

| ID | Requisito | Criterio observable | Prueba |
| --- | --- | --- | --- |
| RF-001 | Abrir sin login | `index.html` permite iniciar sin credenciales | TST-SMOKE-001 |
| RF-002 | Ver aviso de privacidad local | Disclaimer visible en home y documentos | TST-PRIV-001 |
| RF-003 | Registrar actividades | El usuario captura nombre, horas, impacto, energia, tipo e interrupciones | TST-FUNC-001 |
| RF-004 | Persistir sesion | Recargar conserva actividades en `localStorage` | TST-STOR-001 |
| RF-005 | Diagnosticar | El sistema calcula score y tarjetas de diagnostico | TST-ENG-001 |
| RF-006 | Mapear tiempo | El sistema ubica actividades en cuadrantes impacto/energia | TST-ENG-002 |
| RF-007 | Debatir socraticamente | El sistema muestra preguntas segun diagnostico | TST-FUNC-002 |
| RF-008 | Planificar semana | El usuario registra prioridad, deep work, batch, buffer y no deliberado | TST-FUNC-003 |
| RF-009 | Exportar Markdown | Descarga `bmad-input.md` con diagnostico y plan | TST-EXP-001 |
| RF-010 | Exportar JSON | Descarga `bmap-session.json` parseable | TST-EXP-002 |
| RF-011 | Limpiar sesion | Boton borra almacenamiento local y reinicia UI | TST-STOR-002 |

## Invariantes

1. La app no requiere autenticacion. [CONFIG]
2. La misma entrada produce el mismo diagnostico. [CONFIG]
3. La exportacion refleja el estado visible de la sesion. [CONFIG]
4. El reset no debe borrar archivos del repo, solo estado del navegador. [CONFIG]

