# BMAD Workshop Help

## Proposito

Este documento guia el taller para materializar la mini app De Ocupado a Productivo usando BMAD, Antigravity, Codex y los artefactos del repo. [DOC]

## Instalacion ejecutada

```bash
npx bmad-method install --yes \
  --modules bmm,bmb,tea \
  --tools antigravity,codex \
  --user-name "Javier Montaño" \
  --communication-language es \
  --document-output-language es \
  --output-folder _bmad-output
```

## Help inicial

```text
bmad-help
bmad-help Quiero materializar esta mini app usando el contenido del repo. Dime el siguiente workflow, insumos requeridos y criterio de terminado.
```

## Secuencia recomendada

1. `bmad-help`: detectar estado del proyecto.
2. `bmad-create-prd`: formalizar requerimientos desde `documento-funcional.html`, `specs/` y `bmap/prd.md`.
3. `bmad-create-architecture`: usar `documento-tecnico.html`, `assets/` y `quality/`.
4. `bmad-create-epics-and-stories`: convertir PRD y arquitectura en stories.
5. `bmad-check-implementation-readiness`: validar cohesion.
6. `bmad-sprint-planning`: crear seguimiento.
7. `bmad-create-story`: preparar story concreta.
8. `bmad-dev-story`: implementar.
9. `bmad-code-review`: revisar calidad.

## Contexto que debe cargarse

1. `README.md`
2. `documento-funcional.html`
3. `documento-tecnico.html`
4. `bmap/prd.md`
5. `bmap/architecture-brief.md`
6. `specs/01-functional-spec.md`
7. `quality/test-plan.md`

## Regla de seguridad para Gemini

El API token es BYOK. No se escribe en archivos, no se exporta, no se publica en GitHub y solo se usa para llamadas directas del navegador si el usuario lo pega. [CONFIG]
