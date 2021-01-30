---
to: "<%= types.includes('Show') ? `src/models/${h.changeCase.camel(Name)}/Show/tabs/index.ts` : null %>"
---
export { default as BasicsTab } from './BasicsTab';
