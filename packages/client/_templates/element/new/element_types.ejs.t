---
to: src/elements/<%= h.changeCase.pascal(Name) %>/<%= h.changeCase.pascal(Name) %>.types.d.ts
---
import { ReactNode } from 'react';

interface <%= h.changeCase.pascal(Name) %>Props {
  children?: ReactNode;
}
