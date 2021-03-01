import regex from '.';

describe('Regular expressions', () => {
  describe('Match email', () => {
    it('returns true for proper email address', () => {
      const email = 'joe.doe@gmail.com';
      expect(regex.matchEmail.test(email)).toEqual(true);
    });

    it('returns false for email address without @', () => {
      const email = 'joe.doe.gmail.com';
      expect(regex.matchEmail.test(email)).toEqual(false);
    });

    it('returns false for email address without domain', () => {
      const email = 'joe.doe@gmail';
      expect(regex.matchEmail.test(email)).toEqual(false);
    });

    it('returns false for email address without prefix', () => {
      const email = '@gmail.com';
      expect(regex.matchEmail.test(email)).toEqual(false);
    });
  });
});
