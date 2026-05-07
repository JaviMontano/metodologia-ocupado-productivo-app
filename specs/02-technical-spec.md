# 02 Technical Spec

## Runtime

HTML, CSS y JavaScript plano ejecutados por navegador. No hay build ni dependencias externas obligatorias. [CONFIG]

## Componentes

| Componente | Responsabilidad |
| --- | --- |
| `index.html` | UI principal y estaciones del taller |
| `assets/styles.css` | Sistema visual oscuro MetodologIA |
| `assets/storage.js` | Adaptador de `localStorage` |
| `assets/diagnostic-engine.js` | Calculo deterministico del diagnostico |
| `assets/exporters.js` | Markdown, JSON y descarga local |
| `assets/app.js` | Binding DOM, render y eventos |
| `data/questions.json` | Banco de preguntas de referencia |
| `data/rubrics.json` | Rubricas impacto/energia/tipo |

## Persistencia

Clave: `metodologia.ocupadoProductivo.session.v1`. El valor es JSON serializado con actividades, decision, plan y timestamp. [CONFIG]

## Seguridad tecnica

1. No se cargan scripts externos. [CONFIG]
2. No hay `fetch`, `XMLHttpRequest` ni beacon. [CONFIG]
3. La limpieza de sesion usa `localStorage.removeItem` y `sessionStorage.clear`. [CONFIG]
4. El contenido ingresado se escapa antes de renderizarse en listas. [CONFIG]

## Compatibilidad

Navegadores modernos con soporte de `localStorage`, `Blob`, `URL.createObjectURL` y JavaScript ES6 basico. [CONFIG]
## Cliente Gemini BYOK

La integracion se implementa en `assets/gemini-workshop.js`. Usa `sessionStorage` para token temporal y `localStorage` solo si el usuario pide recordar. El endpoint usado es `generateContent` de Gemini con modelo editable y default `gemini-2.5-flash`. [CONFIG]

Los archivos cargados se procesan localmente con `FileReader`: texto como `text`, imagenes/PDF como `inline_data`. [CONFIG]
