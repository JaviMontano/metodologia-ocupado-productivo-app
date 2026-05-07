# 04 User Journey

## Usuario

Cualquier persona que quiere diagnosticar su uso del tiempo y transformar su semana. [DOC]

## Recorrido

1. Abre `index.html` sin login.
2. Lee proposito y privacidad local.
3. Ingresa o carga actividades de la semana.
4. Clasifica cada actividad por horas, impacto, energia, tipo e interrupciones.
5. Observa score y mapa de cuadrantes.
6. Lee preguntas socraticas.
7. Escribe una decision.
8. Define prioridad unica, deep work, batch, buffer y no deliberado.
9. Genera export Markdown y JSON.
10. Limpia sesion para reiniciar o preparar una copia limpia.

## Escenario BDD principal

Given una persona abre la app sin login
When registra actividades y genera export
Then obtiene diagnostico, preguntas, plan semanal, Markdown y JSON sin enviar datos a servidores. [CONFIG]
