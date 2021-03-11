import { Link } from 'react-tiger-transition';
import styled, { css } from 'styled-components';

import { BaseLinkProps, GetLinkColorProps, StyledLinkProps } from './Link.types';

const getLinkColor = ({
  $colorVariant,
  theme: {
    palette: { text, primary },
  },
}: GetLinkColorProps) => {
  switch ($colorVariant) {
    case 'default':
      return text.primary;
    case 'colour':
      return primary.main;

    case 'grey':
      return text.secondary;
    default:
      return $colorVariant;
  }
};

const getHoverLinkColor = ({
  $colorVariant,
  theme: {
    palette: { text, primary },
  },
}: GetLinkColorProps) => {
  switch ($colorVariant) {
    case 'default':
      return text.secondary;
    case 'colour':
      return primary.mainInvert;

    case 'grey':
      return text.primary;
    default:
      return $colorVariant;
  }
};

const baseLink = ({ theme: { palette } }: BaseLinkProps) => css`
  color: ${getLinkColor};
  transition: color 150ms ease-in-out;

  &:disabled {
    color: ${palette.action.disabled};
    cursor: not-allowed;
    pointer-events: all !important;
  }

  &:hover,
  &:active {
    color: ${getHoverLinkColor};
  }
`;

export const StyledLink = styled(Link)<StyledLinkProps>`
  ${baseLink}
`;

export const StyledOutLink = styled.a<StyledLinkProps>`
  ${baseLink}
`;
