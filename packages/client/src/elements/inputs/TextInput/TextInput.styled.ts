import styled from 'styled-components';

import {
  InputAdornmentProps,
  LabelProps,
  StyledInputProps,
  TextInputContainerProps,
} from './TextInput.types';
import { getInputPadding, inputAdornmentSize, inputBasePadding } from './utils';

export const InputAdornment = styled.span<InputAdornmentProps>`
  color: ${({ theme }) => theme.palette.colors.orange};
  position: absolute;
  top: 44px;
  ${({ position }) => `${position === 'start' ? 'left:' : 'right:'} ${inputBasePadding}px`};
  z-index: 2;
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
  color: ${isError ? palette.action.error : palette.text.secondary};
  border-color: ${isError ? palette.action.error : palette.text.primary};
  pointer-events: none;
  transition: top, font-size, left, color;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  ${
    required
      ? `
      :after {
        content: '*';
        color: ${palette.action.error};
      }
  `
      : ''
  }
`,
);

export const StyledInput = styled.input<StyledInputProps>(
  ({
    showPassword,
    maxWidth,
    isStartAdornment,
    isError,
    isEndAdornment,
    theme: { palette, sizes },
  }) => `
  padding: ${getInputPadding(isStartAdornment, isEndAdornment)};
  width: 100%;
  min-width: 250px;
  height: 55px;
  color: ${showPassword ? palette.text.dark : palette.text.light};
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${sizes.borderRadius};
  outline: none;
  ${maxWidth ? `max-width: ${maxWidth}` : ''};
  cursor: text;
  position: absolute;
  z-index: 1;
  font-size: 16px;

  // Resolves issue with native background color on field autofill
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${showPassword ? palette.text.dark : palette.text.light};
  }

  &:focus {
    border: 2px solid ${palette.primary.light};
  }

  ${isError ? `border: 1px solid ${palette.action.error}` : ''};

  ::placeholder {
    color: ${showPassword ? palette.text.dark : palette.text.light};
    opacity: 0.6;
  }
`,
);

export const Container = styled.div<TextInputContainerProps>(
  ({ isPasswordMasked, theme: { sizes, palette } }) => `
  position: relative;
  padding: 28px 0 0;
  height: 105px;
  margin-top: 10px;
  text-align: left;

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
          top: 32px;
          left: calc(100% - 45px - 14px);
          bottom: 18px;
          right: 15px;
          border-radius: 50%;
      `
    }
  }
  &:before {
    content: '';
    box-shadow: ${palette.boxShadow.small};
    position: absolute;
    background: ${palette.primary.light};
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
    color: ${palette.text.primary};
  }

  & input:hover + label {
    color: ${palette.text.primary};
  }
`,
);

export const Error = styled.div`
  color: ${({ theme: { palette } }) => palette.action.error};
  font-size: 13px;
  height: 13px;
  left: 10px;
  margin-left: 5px;
  margin-top: 5px;
  position: absolute;
  top: 85px;
`;
