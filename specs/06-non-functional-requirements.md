# 06 Non Functional Requirements

| ID | Requisito | Criterio |
| --- | --- | --- |
| NFR-001 | Portabilidad | El repo corre como archivos estaticos |
| NFR-002 | Privacidad | La app base no transmite datos a servidores; Gemini solo opera por token BYOK explicito |
| NFR-003 | Disponibilidad local | Opera sin internet despues de tener los archivos |
| NFR-004 | Usabilidad | Flujo visible por estaciones |
| NFR-005 | Accesibilidad basica | Controles con labels y estructura semantica |
| NFR-006 | Mantenibilidad | JS separado por storage, motor, export y UI |
| NFR-007 | Observabilidad pedagogica | Resultados y export hacen visible el razonamiento |
| NFR-008 | Degradacion | Si no hay datos, la app muestra estado vacio util |
| NFR-009 | Seguridad de secretos | Token Gemini no se commitea, no se exporta y puede borrarse desde UI |
| NFR-010 | Multimodalidad responsable | Imagenes y anexos se analizan sin identificacion personal ni inferencias sensibles |
| NFR-011 | Function calling controlado | Solo se ejecutan tools locales allowlisted |
| NFR-012 | Documentacion robusta | Documento funcional y tecnico tienen profundidad de playbook/blueprint |
