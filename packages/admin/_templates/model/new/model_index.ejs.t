---
to: src/models/<%= h.changeCase.camel(Name) %>/index.ts
---
<%- types.map(type =>`export { default as ${h.changeCase.pascal(Name)}${type} } from './${type}';`).join("\n")%>
