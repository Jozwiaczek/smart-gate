---
inject: true
to: src/elements/index.ts
append: true
---
export { default as <%= h.changeCase.pascal(Name) %> } from './<%= h.changeCase.pascal(Name) %>';
