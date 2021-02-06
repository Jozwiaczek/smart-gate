---
inject: true
to: src/elements/index.ts
append: true
skip_if: <%= h.changeCase.pascal(Name) %>
---
export { default as <%= h.changeCase.pascal(Name) %> } from './<%= h.changeCase.pascal(Name) %>';
