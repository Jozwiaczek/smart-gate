import styled from 'styled-components';

import { ThemeType } from '../../../theme/Theme';
import { ButtonProps } from './Button.types';

export const IconContainer = styled.div`
  margin-left: 8px;
`;

export const StyledButton = styled.button<ButtonProps>(
  ({ colorVariant, fullWidth, margin, theme: { palette } }) => `
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 12px;
  font-size: 16px;
  background-color: ${
    colorVariant === ThemeType.light ? palette.primary.light : palette.primary.dark
  };
  color: ${colorVariant === ThemeType.light ? palette.text.dark : palette.text.light};
  padding: 21px 14px;
  margin: ${margin};
  text-align: center;
  border: none;
  min-width: 100px;
  cursor: pointer;
  line-height: 16px;
  transition: 0.15s;
  overflow: hidden;
  outline: none;
  
  ${fullWidth && 'width: 100%'};

  &:disabled {
    background-color: ${palette.background.disabled};
    color: ${palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;

    &:hover,
    &:active {
      background-color: ${palette.background.disabled};
      box-shadow: none;
    }

    :active::after {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  :hover {
    box-shadow: ${palette.boxShadow.big};
    svg {
      transform: translateX(3px); 
      transition: transform 150ms ease-in-out;
    }
  }

  :focus {
    transition: box-shadow 150ms ease-in-out;
    box-shadow: 0 0 0 3px ${
      colorVariant === ThemeType.light ? palette.primary.dark : palette.primary.light
    };
  }

  // Overlay
  ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0;
    transition: opacity 0.2s;
  }

  ::after {
    padding: 50%;
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
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
