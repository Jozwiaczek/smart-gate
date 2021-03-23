import hexToRgba from '.';

describe('hexToRgba', () => {
  const expectedResult = 'rgba(17, 34, 51, 1)';
  const expectedResultWithOpacity = 'rgba(17, 34, 51, 0.5)';

  it('returns rgba color for hex with #', () => {
    const label = hexToRgba('#112233');
    expect(label).toEqual(expectedResult);
  });

  it('returns rgba color for hex without #', () => {
    const label = hexToRgba('112233');
    expect(label).toEqual(expectedResult);
  });

  it('returns rgba color for hex with opacity', () => {
    const label = hexToRgba('#112233', 0.5);
    expect(label).toEqual(expectedResultWithOpacity);
  });

  it('throws error for invalid hex', () => {
    expect(() => hexToRgba('#INVALID_HEX')).toThrowError(new Error('Invalid hex color'));
  });
});
