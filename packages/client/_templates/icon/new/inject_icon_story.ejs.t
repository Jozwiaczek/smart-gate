---
inject: true
to: src/icons/icons.stories.tsx
after: <IconsWrapper>
skip_if: <<%= h.changeCase.pascal(Name) %>Icon />
---
<<%= h.changeCase.pascal(Name) %>Icon />
