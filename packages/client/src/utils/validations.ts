export const isValidLength = (value: string, length = 8): boolean => value.length >= length;

export const hasLetter = (value: string, quantity = 1): boolean =>
  new RegExp(`[a-zA-Z]{${quantity}}`).test(value);

export const hasNumeric = (value: string, quantity = 1): boolean =>
  new RegExp(`[0-9]{${quantity}}`).test(value);

export const hasSpecialChar = (value: string, quantity = 1): boolean =>
  new RegExp(`[^A-Za-z0-9]{${quantity}}`).test(value);

export const hasUppercaseLetter = (value: string, quantity = 1): boolean =>
  new RegExp(`[A-Z]{${quantity}}`).test(value);

export const hasLowercaseLetter = (value: string, quantity = 1): boolean =>
  new RegExp(`[a-z]{${quantity}}`).test(value);

// eslint-disable-next-line
export const composeValidation = (...fns: Array<any>) => (value?: string): boolean =>
  fns.reduceRight((acc, fn) => [...acc, fn(value)], []).every(Boolean);

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const isValidPassword = composeValidation(
  isValidLength,
  hasLowercaseLetter,
  hasUppercaseLetter,
  hasNumeric,
  hasSpecialChar,
);
