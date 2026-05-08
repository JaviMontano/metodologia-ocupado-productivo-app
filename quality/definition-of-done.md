# Definition of Done

## Producto

1. La app corre desde `index.html` sin login. [CONFIG]
2. Documento funcional y documento tecnico existen como HTML independientes. [CONFIG]
3. Los prototipos son navegables y siguen un unico usuario. [CONFIG]
4. El journey existe en Markdown y HTML. [CONFIG]
5. Specs SDD, quality y BMAP/BMAD estan completos. [DOC]
6. Workshop BMAD inicia con API key e incluye inicializacion IA, multimodalidad, function calling local y handoff seguro. [CONFIG]

## Calidad

1. No hay links locales rotos. [CONFIG]
2. No hay HTML sin cierre final. [CONFIG]
3. No hay marcas o nombres ajenos al caso. [CONFIG]
4. No hay llamadas externas requeridas para operar la app base. [CONFIG]
5. Export Markdown y JSON funcionan. [CONFIG]
6. Reset limpia estado local. [CONFIG]
7. Sin token, Gemini queda bloqueado y no llama API externa. [CONFIG]
8. Con mock, la inicializacion IA carga contexto y genera salida operativa sin ejecutar comandos del sistema. [CONFIG]
9. Con mock, payload Gemini incluye anexos y function declarations. [CONFIG]
10. Handoff workshop no contiene API token ni patron de key. [CONFIG]
