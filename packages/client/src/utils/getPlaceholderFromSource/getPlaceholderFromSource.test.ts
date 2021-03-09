import getPlaceholderFromSource from '.';

describe('getPlaceholderFromSource', () => {
  const expectedResult = 'first name';

  it('returns label for camelCase string', () => {
    const label = getPlaceholderFromSource('firstName');
    expect(label).toEqual(expectedResult);
  });

  it('returns label for pascalCase string', () => {
    const label = getPlaceholderFromSource('FirstName');
    expect(label).toEqual(expectedResult);
  });

  it('returns same string for label string', () => {
    const label = getPlaceholderFromSource('First name');
    expect(label).toEqual(expectedResult);
  });

  it('returns label for lowerCase string with spaces', () => {
    const label = getPlaceholderFromSource('first name');
    expect(label).toEqual(expectedResult);
  });

  it('returns empty string for empty string', () => {
    const label = getPlaceholderFromSource('');
    expect(label).toEqual('');
  });
});
