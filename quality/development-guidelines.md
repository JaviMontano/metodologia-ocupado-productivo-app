# Development Guidelines

## Principios

1. Mantener la app estatica y sin dependencias externas salvo decision explicita. [CONFIG]
2. Separar responsabilidades: storage, motor, export y UI. [CONFIG]
3. Usar funciones deterministicas para reglas de diagnostico. [CONFIG]
4. Escapar texto del usuario antes de renderizarlo. [CONFIG]
5. Mantener rutas relativas para Hostinger. [CONFIG]
6. No introducir login, backend ni telemetria sin nueva spec. [DOC]

## TDD minimo

Antes de tocar reglas de diagnostico, escribir casos de entrada/salida para scores, buckets y preguntas. [DOC]

## Revision

Todo cambio debe actualizar traceability si toca requisitos, pruebas o contratos exportados. [DOC]
