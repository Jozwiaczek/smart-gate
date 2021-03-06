import styled from 'styled-components';

import { CheckboxLabelProps, CheckboxWrapperProps, CheckmarkProps } from './Checkbox.types';

export const CheckboxLabel = styled.label<CheckboxLabelProps>`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 26px;
  padding-left: 36px;
  position: relative;
  user-select: none;

  p {
    color: ${({ theme }) => theme.palette.text.secondary};
    transition: color;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
  }

  ${({ required, theme }) =>
    required &&
    `
      :after {
        content: '*';
        color: ${theme.palette.action.error};
      }
  `}
`;

export const Checkmark = styled.span<CheckmarkProps>(
  ({ isError, theme: { palette } }) => `
  position: absolute;
  top: calc(50% - 13px);
  left: 0;
  height: 26px;
  width: 26px;
  background-color: transparent;
  border: 3px solid ${palette.primary.dark};
  border-radius: 6px;

  ${
    isError
      ? `
      border: 2px solid ${palette.action.error};
  `
      : ''
  };

  svg {
    opacity: 0;
    z-index: 2;
    position: absolute;
    width: 45%;
    height: 45%;
    top: 6px;
    left: 6px;
    transition: opacity 200ms ease-out;
    color: ${palette.text.light};
  }

  &::after {
    content: '';
    position: absolute;
    opacity: 0;
    left: 2px;
    top: 2px;
    display: flex;
    width: 16px;
    height: 16px;
    background: ${palette.primary.dark};
    border-radius: 4px;
    transition: opacity 200ms ease-out;
  }
`,
);

export const StyledInput = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;

  :focus-visible ~ ${Checkmark} {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.primary.light};
  }

  :hover ~ p,
  :active ~ p {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  :checked ~ ${Checkmark}::after, &:checked ~ ${Checkmark} > svg {
    opacity: 1;
  }
`;

export const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
  display: inline-block;
  margin: ${({ margin }) => margin};
`;
