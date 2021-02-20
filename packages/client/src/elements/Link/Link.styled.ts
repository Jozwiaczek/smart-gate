import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { ITheme, ThemeType } from '../../theme/Theme';
import { LinkColor, LinkProps } from './Link.types';

const baseLink = ({ color, theme: { type, palette } }: { theme: ITheme; color?: LinkColor }) => css`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
  color: ${color || palette.text.primary};

  &:disabled {
    color: ${palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;
  }

  &:hover,
  &:active {
    color: ${type === ThemeType.light ? palette.primary.dark : palette.primary.light};
  }
`;

export const StyledLink = styled(Link)<LinkProps>`
  ${baseLink}
`;

export const StyledOutLink = styled.a<LinkProps>`
  ${baseLink}
`;
