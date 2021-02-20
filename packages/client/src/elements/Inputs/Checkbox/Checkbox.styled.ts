import styled from 'styled-components';

import { CheckboxLabelProps, CheckboxWrapperProps, CheckmarkProps } from './Checkbox.types';

export const CheckboxLabel = styled.label<CheckboxLabelProps>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text.primary};
  line-height: 24px;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  user-select: none;
  ${({ required, theme }) =>
    required &&
    `
      :after {
        content: '*';
        color: ${theme.palette.error.main};
      }
  `}
`;

export const Checkmark = styled.span<CheckmarkProps>(
  ({ isError, theme: { palette } }) => `
  position: absolute;
  top: calc(50% - 10px);
  left: 0;
  height: 20px;
  width: 20px;
  background-color: ${palette.background.default};
  border: 2px solid ${palette.primary.dark};
  border-radius: 6px;

  ${
    isError &&
    `
      border: 2px solid ${palette.error.main};
  `
  };

  svg {
    opacity: 0;
    z-index: 2;
    position: absolute;
    width: 8px;
    height: 7px;
    top: 5px;
    left: 4px;
    transition: opacity 200ms ease-out;
  }

  &::after {
    content: '';
    position: absolute;
    opacity: 0;
    left: 1px;
    top: 1px;
    width: 14px;
    height: 14px;
    background: ${palette.primary.dark};
    border-radius: 4px;
    transition: opacity 200ms ease-out;
  }
`,
);

export const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ ${Checkmark}::after, &:checked ~ ${Checkmark} > svg {
    opacity: 1;
  }
`;

export const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
  display: inline-block;
  margin: ${({ margin }) => margin};
`;
