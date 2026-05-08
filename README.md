# De Ocupado a Productivo - Mini App MetodologIA

Repo estatico para ejecutar un taller practico sobre diagnostico del uso del tiempo, documentacion funcional/tecnica robusta y handoff BMAD/BMAP con asistente Gemini BYOK. El flujo del workshop inicia cargando API key para que la IA vitamine e inicialice el entorno. [DOC]

## Entrada

Abre `index.html` localmente o sube el repo completo a Hostinger manteniendo las carpetas. [CONFIG]

## Entregables

1. `index.html`: app stand alone con diagnostico, debate socratico, mapa de tiempo, plan semanal, export BMAD/BMAP y limpieza de sesion.
2. `documento-funcional.html`: documento funcional independiente con indice, journey, requisitos RF, criterios, riesgos y trazabilidad.
3. `documento-tecnico.html`: blueprint tecnico independiente con arquitectura, componentes, datos, Gemini BYOK, multimodalidad, function calling, seguridad y pruebas.
4. `journeys/usuario-diagnostico-tiempo.md`: journey unico del usuario.
5. `prototipos/`: prototipos navegables del mismo journey.
6. `specs/`: specs SDD.
7. `quality/`: plan de pruebas, DoD, criterios y guidelines BDD/TDD/ATDD.
8. `bmap/`: briefs, PRD, arquitectura, epicas, QA strategy y handoff JSON.

## Privacidad

Esta mini app es un material academico de MetodologIA. La app base opera sin login, guarda datos solo en el navegador y no envia informacion a servidores. El asistente Gemini es opcional y solo llama una API externa cuando el usuario pega su propio token desde pantalla. El diagnostico es orientativo y no sustituye acompanamiento profesional, medico, psicologico, legal ni laboral.

## Despliegue manual

Sube todos los archivos y carpetas del repo a `public_html` o a una subcarpeta de Hostinger. No hay build, backend, login, base de datos ni variables de entorno. [CONFIG]
## Workshop BMAD + Gemini

Entrada del taller: `workshop-bmad.html`. [DOC]

Flujo principal: pegar API token propio de Google AI Studio, activar Gemini, ejecutar `Vitamina e inicializa con IA`, revisar comandos/prompts generados, y luego continuar con BMAD, Antigravity y Codex. [CONFIG]

BMAD esta instalado para Google Antigravity y Codex con BMM, BMB y TEA. Usa `bmad-help` desde la raiz del repo para detectar el siguiente paso. [CONFIG]

El chatbot Gemini es opcional y BYOK: el estudiante pega su API token de Google AI Studio en el navegador. El token se guarda en `sessionStorage` por defecto y solo en `localStorage` si el usuario activa "Recordar token". No se commitea ni se incluye en exports. [CONFIG]

Capacidades activadas por token: inicializacion IA del entorno, chat de facilitador BMAD, analisis de anexos TXT/MD/JSON/HTML/PDF, identificacion responsable de imagenes PNG/JPG/WEBP y function calling local allowlisted para diagnostico, anexos, resumen de repo, handoff y limpieza de token. [CONFIG]

Nota de produccion: Google documenta que las API keys no deben exponerse directamente en apps cliente de produccion. Este repo mantiene BYOK para taller academico; una version productiva requiere backend o secretos server-side. [DOC]
