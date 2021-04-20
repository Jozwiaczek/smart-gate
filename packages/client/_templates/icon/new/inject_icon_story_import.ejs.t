---
inject: true
to: src/icons/icons.stories.tsx
before: from '.';
skip_if: <%= h.changeCase.pascal(Name) %>Icon
---
<%= h.changeCase.pascal(Name) %>Icon
