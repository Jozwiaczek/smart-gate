---
inject: true
to: packages/admin/src/models/index.ts
append: true
---
export { <%- types.map(type =>`${h.changeCase.pascal(Name)}${type},`).join(" ")%> } from './<%= h.changeCase.camel(Name) %>';
