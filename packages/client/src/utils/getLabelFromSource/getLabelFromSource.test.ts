import index from './index';

describe('getLabelFromSource', () => {
  it('returns label for camelCase string', () => {
    const label = index('firstName');
    expect(label).toEqual('First name');
  });

  it('returns label for pascalCase string', () => {
    const label = index('FirstName');
    expect(label).toEqual('First name');
  });

  it('returns same string for label string', () => {
    const label = index('First name');
    expect(label).toEqual('First name');
  });

  it('returns label for lowerCase string with spaces', () => {
    const label = index('first name');
    expect(label).toEqual('First name');
  });

  it('returns empty string for empty string', () => {
    const label = index('');
    expect(label).toEqual('');
  });
});
