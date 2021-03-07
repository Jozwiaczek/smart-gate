export const inputAdornmentSize = 22;
export const inputBasePadding = 20;

export const getInputPadding = (isStartAdornment?: boolean, isEndAdornment?: boolean): string => {
  const adornmentPadding = 1.5 * inputBasePadding + inputAdornmentSize;
  let leftPadding = inputBasePadding;
  let rightPadding = inputBasePadding;

  if (isStartAdornment) {
    leftPadding = adornmentPadding;
  }
  if (isEndAdornment) {
    rightPadding = adornmentPadding;
  }

  return `${inputBasePadding}px ${rightPadding}px ${inputBasePadding}px ${leftPadding}px`;
};
