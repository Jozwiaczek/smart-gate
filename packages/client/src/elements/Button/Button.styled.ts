import styled from 'styled-components';
import { ButtonProps } from './Button.types';

export const StyledButton = styled.button<ButtonProps>(
  ({ color, theme: { palette } }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 12px;
  font-size: 16px;
  background-color: ${color !== 'primary' ? palette.secondary.main : palette.primary.main};
  color: ${palette.primary.contrastText};
  padding: 21px 14px;
  margin: 0;
  text-align: center;
  border: none;
  min-width: 220px;
  cursor: pointer;
  line-height: 16px;
  transition: 0.15s;

  &:disabled {
    background-color: ${palette.action.disabledBackground};
    color: ${palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;

    &:hover,
    &:active {
      background-color: ${palette.action.disabledBackground};
      box-shadow: none;
    }

    :active::after {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  &:hover,
  &:active {
    background-color: ${color !== 'primary' ? palette.secondary.dark : palette.primary.dark};
    box-shadow: ${palette.boxShadow};
  }

  &:focus {
    outline: 0;
  }

  // Overlay
  ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    opacity: 0;
    transition: opacity 0.2s;
  }

  ::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    padding: 50%;
    width: 32px;
    height: 32px;
    background-color: #fff;
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
    transition: opacity 1s, transform 0.5s;
  }

  :active::after {
    opacity: 0.32;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0s;
  }
`,
);
