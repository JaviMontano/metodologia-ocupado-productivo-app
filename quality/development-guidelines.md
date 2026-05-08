# Development Guidelines

## Principios

1. Mantener la app estatica y sin dependencias externas obligatorias salvo decision explicita. [CONFIG]
2. Separar responsabilidades: storage, motor, export y UI. [CONFIG]
3. Usar funciones deterministicas para reglas de diagnostico. [CONFIG]
4. Escapar texto del usuario antes de renderizarlo. [CONFIG]
5. Mantener rutas relativas para Hostinger. [CONFIG]
6. No introducir login, backend ni telemetria sin nueva spec. [DOC]
7. Mantener Gemini como BYOK opcional: nunca hardcodear tokens ni secretos. [CONFIG]
8. Ejecutar function calling solo con allowlist local; no usar `eval`, comandos de sistema ni codigo dinamico. [CONFIG]
9. Tratar imagenes y anexos como datos potencialmente sensibles; no persistir contenido completo fuera de la sesion de navegador. [DOC]

## TDD minimo

Antes de tocar reglas de diagnostico, escribir casos de entrada/salida para scores, buckets y preguntas. [DOC]

## Revision

Todo cambio debe actualizar traceability si toca requisitos, pruebas o contratos exportados. [DOC]

## Reglas para Gemini

1. El token se lee desde UI y se guarda en `sessionStorage` por defecto. [CONFIG]
2. `localStorage` para token solo se usa si el usuario activa recordar. [CONFIG]
3. Los tests automatizados deben usar mocks de payload, no tokens reales. [DOC]
4. El handoff puede incluir metadata de archivos y tool traces, pero nunca token. [CONFIG]
