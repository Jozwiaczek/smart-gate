---
to: "<%= withTest ? `src/utils/${h.changeCase.camel(Name)}/${h.changeCase.camel(Name)}.test${fileExtension}` : null %>"
---
import <%= h.changeCase.camel(Name) %> from '.';

describe('<%= h.changeCase.camel(Name) %>', () => {
  it('add description', () => {
    const result = <%= h.changeCase.camel(Name) %>();
    const expectedResult = '';

    expect(result).toEqual(expectedResult);
  });
});
