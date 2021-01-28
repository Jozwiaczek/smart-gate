---
to: packages/admin/src/models/<%= h.changeCase.pascal(Name) %>/index.ts
---
<%- types.map(type =>`export { default as ${h.changeCase.pascal(Name)}${type} } from './${type}';`).join("\n")%>
