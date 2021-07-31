import styled, { css } from 'styled-components';

import { ThemeType } from '../../../theme/Theme';
import hexToRgba from '../../../utils/hexToRgba';
import { ButtonProps, HelperStyledFunction } from './Button.types';

const getFontColor = ({
  colorVariant,
  palette: {
    text: { light, dark, primary },
  },
}: HelperStyledFunction): string => {
  switch (colorVariant) {
    case 'blue':
      return light as string;
    case 'red':
      return light as string;
    case ThemeType.dark:
      return light as string;
    case ThemeType.light:
      return dark as string;
    case 'card':
      return primary as string;
    default:
      return primary as string;
  }
};

const getBaseColor = ({
  colorVariant,
  palette: { colors, primary, background },
}: HelperStyledFunction): string => {
  switch (colorVariant) {
    case 'blue':
      return colors.blue as string;
    case 'red':
      return colors.red as string;
    case 'card':
      return background.paper as string;
    case ThemeType.dark:
      return primary.dark as string;
    case ThemeType.light:
      return primary.light as string;
    default:
      return primary.dark as string;
  }
};

export const StyledButton = styled.button<ButtonProps>(
  ({ colorVariant, fullWidth, margin, theme: { palette, sizes, name } }) => {
    const disabledBgColor = hexToRgba(
      getBaseColor({ colorVariant, palette }),
      name === 'dark' ? 0.15 : 0.5,
    );

    return css`
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
      ${margin ? `margin: ${margin}` : ''};
      border: none;
      min-width: 100px;
      cursor: pointer;
      line-height: 16px;
      outline: none;
      box-shadow: ${palette.boxShadow.default};
      transition: box-shadow 150ms ease-in-out;

      ${fullWidth ? 'width: 100%' : ''};

      svg {
        transition: transform 150ms ease-in-out;
        margin-left: ${fullWidth ? '16px' : '8px'};
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
        box-shadow: 0 0 0 3px
          ${colorVariant === ThemeType.light ? palette.primary.dark : palette.primary.light};
      }

      :disabled {
        transition: none;
        background: ${disabledBgColor};
        color: ${palette.text.disabled};
        cursor: not-allowed;
        pointer-events: all !important;

        :hover,
        :active {
          box-shadow: ${palette.boxShadow.default};
          background: ${disabledBgColor};
          svg {
            transform: none;
          }
        }

        :active::after {
          opacity: 1;
          transform: none;
        }
      }
    `;
  },
);
