# QA Guidelines BDD TDD ATDD

## BDD

Escribir escenarios desde el journey unico: abrir, capturar, diagnosticar, debatir, planificar, exportar, activar Gemini desde pantalla, cargar anexos, generar handoff y limpiar. [DOC]

## TDD

Probar el motor deterministico con fixtures pequenos antes de cambiar ponderaciones. Para Gemini, probar builders y tools con mocks, nunca con token real en tests automatizados. [DOC]

## ATDD

Convertir criterios de aceptacion en pruebas de navegador: el usuario obtiene resultado visible y exportable sin login ni red, y el modo Gemini queda bloqueado hasta que el usuario pega token. [DOC]

## Capas de calidad

1. Unidad: reglas puras de diagnostico.
2. Integracion: storage mas render.
3. Contrato: JSON exportado parseable.
4. E2E: journey completo con demo.
5. Accesibilidad: navegacion, labels y estructura semantica.
6. Seguridad basica: app base sin llamadas externas y sin persistencia remota.
7. Gemini mock: payload multimodal, function declarations y errores controlados sin usar token real.
8. Secret scanning: busqueda negativa de tokens y exports sin secretos.
