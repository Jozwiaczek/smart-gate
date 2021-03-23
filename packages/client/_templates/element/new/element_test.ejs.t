---
to: "<%= isTest ? `src/elements/${h.changeCase.pascal(Name)}/${h.changeCase.pascal(Name)}.test.tsx` : null %>"
---
import React from 'react';

import { render, screen } from '../../utils/testingLibraryInstance';
import <%= h.changeCase.pascal(Name) %> from '.';

describe('<%= h.changeCase.pascal(Name) %>', () => {
  it('should render properly', () => {
    render(< <%= h.changeCase.pascal(Name) %> />);
    const <%= h.changeCase.camel(Name) %> = screen.getByTestId('<%= h.changeCase.camel(Name) %>');

    expect(<%= h.changeCase.camel(Name) %>).toBeTruthy();
  });
});
