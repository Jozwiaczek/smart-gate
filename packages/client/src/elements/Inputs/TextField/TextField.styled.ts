import styled from 'styled-components';

import { InputAdornmentProps, LabelProps, StyledInputProps } from './TextField.types';

const inputAdornmentSize = 22;
const inputBasePadding = 20;

export const InputAdornment = styled.span<InputAdornmentProps>`
  position: absolute;
  top: 44px;
  ${({ position }) => `${position === 'start' ? 'left:' : 'right:'} ${inputBasePadding}px`};
  svg {
    font-size: ${inputAdornmentSize}px;
  }
`;

export const Label = styled.label<LabelProps>(
  ({ required, isError, theme: { palette } }) => `
  line-height: 150%;
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  transition: 0.2s;
  color: ${isError ? palette.error.main : palette.text.secondary};
  border-color: ${isError ? palette.error.main : palette.text.secondary};
  pointer-events: none;
  transition: top, font-size, left;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
  ${
    required &&
    `
      :after {
        content: '*';
        color: ${palette.error.main};
      }
  `
  }
`,
);

const getInputPadding = (isStartAdornment?: boolean, isEndAdornment?: boolean): string => {
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

export const StyledInput = styled.input<StyledInputProps>(
  ({ maxWidth, isError, isStartAdornment, isEndAdornment, theme: { palette, sizes } }) => `
  padding: ${getInputPadding(isStartAdornment, isEndAdornment)};
  width: 100%;
  min-width: 250px;
  background: ${palette.background.default};
  color: ${palette.text.secondary};
  border: 1px solid ${isError ? palette.error.main : '#ececec'};
  box-sizing: border-box;
  border-radius: ${sizes.borderRadius};
  outline: none;
  max-width: ${maxWidth};
  cursor: text;
`,
);

export const Container = styled.div`
  position: relative;
  padding: 28px 0 0;
  margin-top: 10px;
  & input:focus + label {
    color: ${({ theme: { palette } }) => palette.primary.main};
  }

  & input:focus {
    border-color: ${({ theme: { palette } }) => palette.primary.main};
  }
`;

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error.main};
  font-size: 13px;
  margin-left: 5px;
  margin-top: 5px;
  height: 13px;
`;
