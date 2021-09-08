---
inject: true
to: src/utils/index.ts
append: true
skip_if: <%= h.changeCase.camel(Name) %>
---
export { default as <%= h.changeCase.camel(Name) %> } from './<%= h.changeCase.camel(Name) %>';
