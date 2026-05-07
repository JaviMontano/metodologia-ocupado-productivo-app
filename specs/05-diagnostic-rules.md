# 05 Diagnostic Rules

## Entradas

Actividades con horas, impacto, energia, tipo e interrupciones. [CONFIG]

## Calculos

1. `totalHours`: suma de horas.
2. `productiveIndex`: combina horas de alto impacto, energia neta y ausencia de interrupciones.
3. `hamsterRisk`: porcentaje de horas en bajo impacto y baja energia.
4. `focusDebt`: porcentaje de horas con interrupciones.
5. `operationalLoad`: porcentaje de horas operativas, mantenimiento o comunicacion.
6. `energyNet`: promedio ponderado de energia por horas.

## Reglas de pregunta

1. Si `hamsterRisk >= 25`, preguntar que tarea de bajo valor puede eliminarse, delegarse o agruparse. [CONFIG]
2. Si `focusDebt >= 30`, preguntar que interrupcion se esta tratando como inevitable. [CONFIG]
3. Si `energyNet < 1`, preguntar que tarea importante esta ubicada en franja de baja energia. [CONFIG]
4. Siempre cerrar con evidencia observable de productividad. [DOC]

## Limite

El diagnostico no es clinico, laboral ni psicologico; es un instrumento pedagogico para taller. [DOC]

