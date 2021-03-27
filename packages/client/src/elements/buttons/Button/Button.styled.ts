import styled from 'styled-components';

import { ThemeType } from '../../../theme/Theme';
import { ButtonProps, HelperStyledFunction } from './Button.types';

export const IconContainer = styled.div`
  margin-left: 8px;
`;

const getFontColor = ({
  colorVariant,
  palette: {
    text: { light, dark },
  },
}: HelperStyledFunction) => {
  switch (colorVariant) {
    case 'blue':
      return light;
    case 'red':
      return light;
    case ThemeType.dark:
      return light;
    case ThemeType.light:
      return dark;
    default:
      return dark;
  }
};

const getBaseColor = ({
  colorVariant,
  palette: { colors, primary, background },
}: HelperStyledFunction) => {
  switch (colorVariant) {
    case 'blue':
      return colors.blue;
    case 'red':
      return colors.red;
    case 'card':
      return background.paper;
    case ThemeType.dark:
      return primary.dark;
    case ThemeType.light:
      return primary.light;
    default:
      return primary.dark;
  }
};

export const StyledButton = styled.button<ButtonProps>(
  ({ colorVariant, fullWidth, margin, theme: { palette, sizes } }) => `
  position: relative;
  overflow: hidden;
  
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${sizes.borderRadius};
  font-size: 16px;
  background-color: ${getBaseColor({ colorVariant, palette })};
  color: ${getFontColor({ colorVariant, palette })};
  padding: 21px 14px;
  margin: ${margin};
  border: none;
  min-width: 100px;
  cursor: pointer;
  line-height: 16px;
  outline: none;
  transition: box-shadow 150ms ease-in-out;
  
  ${fullWidth && 'width: 100%'};
  
  svg {
    transition: transform 150ms ease-in-out;
  }

  :hover {
    transition: box-shadow 150ms ease-in-out;
    box-shadow: ${palette.boxShadow.big};
    svg {
      transition: transform 150ms ease-in-out;
      transform: translateX(3px);
    }
  }

  :focus-visible {
    transition: box-shadow 150ms ease-in-out;
    box-shadow: 0 0 0 3px ${
      colorVariant === ThemeType.light ? palette.primary.dark : palette.primary.light
    };
  }
  
  &:disabled {
    transition: none;
    background-color: ${palette.background.disabled};
    color: ${palette.text.disabled};
    cursor: not-allowed;
    pointer-events: all !important;

    &:hover,
    &:active {
      background-color: ${palette.background.disabled};
      box-shadow: none;
      svg {
        transform: none;
      }
    }

    :active::after {
      opacity: 1;
      transform: none;
    }
  }
`,
);
