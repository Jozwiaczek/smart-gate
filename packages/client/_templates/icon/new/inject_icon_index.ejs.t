---
inject: true
to: src/icons/index.ts
append: true
skip_if: <%= h.changeCase.pascal(Name) %>Icon
---
export { default as <%= h.changeCase.pascal(Name) %>Icon } from './<%= h.changeCase.pascal(Name) %>Icon';
