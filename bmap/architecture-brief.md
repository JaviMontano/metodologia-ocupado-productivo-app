# Architecture Brief

## Decision

Aplicacion estatica con HTML, CSS, JavaScript y JSON local. [CONFIG]

## Justificacion

Hostinger soporta despliegue manual de archivos estaticos. El objetivo de privacidad local y cero login favorece una arquitectura sin backend. [CONFIG]

## Riesgos

1. `localStorage` depende del navegador y puede limpiarse manualmente.
2. La app no sincroniza entre dispositivos.
3. El diagnostico es pedagogico y no debe presentarse como evaluacion profesional.

