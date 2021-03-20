---
to: src/elements/<%= h.changeCase.pascal(Name) %>/index.tsx
---
import React from 'react';
import { Wrapper } from './<%= h.changeCase.pascal(Name) %>.styled';

const <%= h.changeCase.pascal(Name) %> = ({ children }: <%= h.changeCase.pascal(Name) %>Props) => <Wrapper data-testid="<%= h.changeCase.camel(Name) %>">{children}</Wrapper>;

<%= h.changeCase.pascal(Name) %>.displayName = '<%= h.changeCase.pascal(Name) %>';

export default <%= h.changeCase.pascal(Name) %>;
