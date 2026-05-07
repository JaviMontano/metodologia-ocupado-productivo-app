# 03 Data Model

## Entidad Activity

| Campo | Tipo | Reglas |
| --- | --- | --- |
| `name` | string | Texto libre visible en mapas y export |
| `hours` | number | Horas de la semana; acepta decimales |
| `impact` | number | Escala 1 a 5 |
| `energy` | number | Escala -5 a 5 |
| `type` | enum | `creacion`, `estrategico`, `operativo`, `mantenimiento`, `comunicacion`, `aprendizaje` |
| `interruptions` | boolean | Marca deuda de foco |

## Entidad Plan

| Campo | Sentido |
| --- | --- |
| `priority` | Prioridad unica que haria valiosa la semana |
| `deep` | Bloque protegido de deep work |
| `batch` | Agrupacion operativa |
| `buffer` | Espacio de recuperacion o preparacion |
| `no` | Renuncia deliberada |

## Entidad Diagnostic

Calculada, no persistida como fuente de verdad. Incluye `totalHours`, `productiveIndex`, `hamsterRisk`, `focusDebt`, `operationalLoad`, `energyNet`, `buckets`, `recommendation` y `questions`. [CONFIG]

