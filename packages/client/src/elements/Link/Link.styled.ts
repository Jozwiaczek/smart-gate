import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { BaseLinkProps, GetLinkColorProps, StyledLinkProps } from './Link.types';

const getLinkColor = ({ $colorVariant, theme }: GetLinkColorProps) => {
  switch ($colorVariant) {
    case 'default':
      return theme.palette.text.primary;
    case 'colour':
      return theme.palette.primary.main;

    case 'grey':
      return theme.palette.text.secondary;
    default:
      return $colorVariant;
  }
};

const baseLink = ({ theme: { palette } }: BaseLinkProps) => css`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-decoration: none;
  color: ${getLinkColor};

  &:disabled {
    color: ${palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;
  }

  &:hover,
  &:active {
    color: ${getLinkColor};
  }
`;

export const StyledLink = styled(Link)<StyledLinkProps>`
  ${baseLink}
`;

export const StyledOutLink = styled.a<StyledLinkProps>`
  ${baseLink}
`;
