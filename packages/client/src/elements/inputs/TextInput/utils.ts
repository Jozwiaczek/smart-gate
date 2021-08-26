export const inputAdornmentSize = 30;
export const inputBasePadding = 20;

export const getInputPadding = (isStartAdornment?: boolean, isEndAdornment?: boolean): string => {
  const adornmentPadding = inputBasePadding + inputAdornmentSize;
  let leftPadding = inputBasePadding;
  let rightPadding = inputBasePadding;

  if (isStartAdornment) {
    leftPadding = adornmentPadding;
  }
  if (isEndAdornment) {
    rightPadding = adornmentPadding * 1.5;
  }

  return `${inputBasePadding}px ${rightPadding}px ${inputBasePadding}px ${leftPadding}px`;
};
