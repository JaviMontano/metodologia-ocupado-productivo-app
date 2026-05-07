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
