---
to: src/elements/<%= h.changeCase.pascal(Name) %>/index.tsx
---
import React from 'react';
import { Wrapper } from './<%= h.changeCase.pascal(Name) %>.styled';
import { <%= h.changeCase.pascal(Name) %>Props } from './<%= h.changeCase.pascal(Name) %>.types';

const <%= h.changeCase.pascal(Name) %> = ({ children }: <%= h.changeCase.pascal(Name) %>Props) => <Wrapper data-testid="<%= h.changeCase.camel(Name) %>">{children}</Wrapper>;

export default <%= h.changeCase.pascal(Name) %>;
