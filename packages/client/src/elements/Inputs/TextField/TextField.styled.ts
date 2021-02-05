import styled from 'styled-components';
import { LabelProps, StyledInputProps } from './TextField.types';

export const IconContainer = styled.span`
  position: absolute;
  top: 43px;
  left: 12px;
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

export const StyledInput = styled.input<StyledInputProps>(
  ({ maxWidth, isError, isIcon, theme: { palette, sizes } }) => `
  padding: ${isIcon ? '20px 20px 20px 46px' : '20px'};
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
