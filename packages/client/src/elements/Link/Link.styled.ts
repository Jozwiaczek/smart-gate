import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { ITheme } from '../../theme/Theme';
import { LinkColor, LinkProps } from './Link.types';

const baseLink = ({ color, theme: { palette } }: { theme: ITheme; color?: LinkColor }) => css`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
  color: ${color !== 'primary' ? palette.text.secondary : palette.primary.main};

  &:disabled {
    color: ${palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;
  }

  &:hover,
  &:active {
    color: ${color !== 'primary' ? palette.action.active : palette.primary.dark};
  }
`;

export const StyledLink = styled(Link)<LinkProps>`
  ${baseLink}
`;

export const StyledOutLink = styled.a<LinkProps>`
  ${baseLink}
`;
