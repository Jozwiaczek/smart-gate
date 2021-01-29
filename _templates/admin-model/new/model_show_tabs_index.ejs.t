---
to: "<%= types.includes('Show') ? `packages/admin/src/models/${h.changeCase.camel(Name)}/Show/tabs/index.ts` : null %>"
---
export { default as BasicsTab } from './BasicsTab';
