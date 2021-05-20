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

export const isValidEmail = (email: string): boolean => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\\".+\\"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const composeValidation =
  (...fns: ((value: string, ...opt: any[]) => boolean)[]) =>
  (value: string): boolean =>
    fns
      .reduceRight((acc: Array<boolean>, fn): Array<boolean> => [...acc, fn(value)], [])
      .every(Boolean);

export const isValidPassword = composeValidation(
  isValidLength,
  hasLowercaseLetter,
  hasUppercaseLetter,
  hasNumeric,
  hasSpecialChar,
);
