import { Link } from 'react-tiger-transition';
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
