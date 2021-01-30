---
to: src/elements/<%= h.changeCase.pascal(Name) %>/<%= h.changeCase.pascal(Name) %>.tsx
---
import React from 'react';
import Wrapper from './<%= h.changeCase.pascal(Name) %>.styled';
import { <%= h.changeCase.pascal(Name) %>Props } from './<%= h.changeCase.pascal(Name) %>.types';

const <%= h.changeCase.pascal(Name) %> = ({ children }: <%= h.changeCase.pascal(Name) %>Props) => <Wrapper>{children}</Wrapper>;

export default <%= h.changeCase.pascal(Name) %>;
