---
to: packages/admin/src/models/<%= h.changeCase.pascal(Name) %>/index.ts
---
<%- ['List', 'Create'].map(type =>`export { default as Admin${type} } from './${type}';`).join("\n")%>
