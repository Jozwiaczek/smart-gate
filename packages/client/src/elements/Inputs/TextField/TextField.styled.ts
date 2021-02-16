import styled from 'styled-components';

import {
  InputAdornmentProps,
  LabelProps,
  StyledInputProps,
  TextFieldContainerProps,
} from './TextField.types';
import { getInputPadding, inputAdornmentSize, inputBasePadding } from './utils';

export const InputAdornment = styled.span<InputAdornmentProps>`
  position: absolute;
  top: 44px;
  z-index: 2;
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
  min-width: 250px;
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

export const StyledInput = styled.input<StyledInputProps>(
  ({ maxWidth, isStartAdornment, isEndAdornment, theme: { palette, sizes } }) => `
  padding: ${getInputPadding(isStartAdornment, isEndAdornment)};
  width: 100%;
  min-width: 250px;
  height: 55px;
  color: ${palette.text.primary};
  background: transparent;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: ${sizes.borderRadius};
  outline: none;
  max-width: ${maxWidth};
  cursor: text;
  position: absolute;
  z-index: 1;
  
  // Resolves issue with native background color on field autofill
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${palette.text.primary};
  }
  
  ::placeholder {
    color: ${palette.text.primary};
    opacity: 0.6;
  }
`,
);

export const Container = styled.div<TextFieldContainerProps>(
  ({ isPasswordMasked, theme: { sizes, palette } }) => `
  position: relative;
  padding: 28px 0 0;
  height: 105px;
  margin-top: 10px;

  // Input background
  &:after {
    content: '';
    position: absolute;
    background: ${palette.primary.dark};
    border-radius: ${sizes.borderRadius};
    border: 1px solid transparent;
    z-index: 0;
    transition-property: height, width, top, bottom, left, border-radius; // without right property
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    ${
      isPasswordMasked
        ? `
          height: 55px;
          width: 100%;
          top: 28px;
          bottom: 18px;
          left: 0;
          right: 0;
      `
        : `
          height: 45px;
          width: 45px;
          top: 33px;
          left: calc(100% - 45px - 15px);
          bottom: 18px;
          right: 15px;
          border-radius: 50%;
      `
    }
  }
  &:before {
    content: '';
    box-shadow: ${palette.boxShadow};
    position: absolute;
    background: ${palette.primary.main};
    border-radius: ${sizes.borderRadius};
    border: 1px solid transparent;
    z-index: 0;
    height: 55px;
    width: 100%;
    top: 28px;
    bottom: 18px;
    left: 0;
    right: 0;
  }

  & input:focus + label {
    color: ${palette.primary.main};
  }
`,
);

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.error.main};
  font-size: 13px;
  margin-left: 5px;
  margin-top: 5px;
  height: 13px;
  position: absolute;
  top: 85px;
  left: 10px;
`;
