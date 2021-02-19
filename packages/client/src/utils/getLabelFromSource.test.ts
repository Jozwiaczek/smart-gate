import getLabelFromSource from './getLabelFromSource';

describe('getLabelFromSource', () => {
  it('returns label for camelCase string', () => {
    const label = getLabelFromSource('firstName');
    expect(label).toEqual('First name');
  });

  it('returns label for pascalCase string', () => {
    const label = getLabelFromSource('FirstName');
    expect(label).toEqual('First name');
  });

  it('returns same string for label string', () => {
    const label = getLabelFromSource('First name');
    expect(label).toEqual('First name');
  });

  it('returns label for lowerCase string with spaces', () => {
    const label = getLabelFromSource('first name');
    expect(label).toEqual('First name');
  });

  it('returns empty string for empty string', () => {
    const label = getLabelFromSource('');
    expect(label).toEqual('');
  });
});
