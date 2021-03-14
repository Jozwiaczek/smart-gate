import React from 'react';

import { StyledLink, StyledOutLink } from './Link.styled';
import { LinkProps } from './Link.types';

const Link = ({ children, to, asOuterLink, colorVariant = 'default', ...rest }: LinkProps) => {
  if (asOuterLink) {
    return (
      <StyledOutLink
        $colorVariant={colorVariant}
        href={to}
        to=""
        rel="noreferrer"
        target="_blank"
        {...rest}
      >
        {children}
      </StyledOutLink>
    );
  }

  return (
    <StyledLink $colorVariant={colorVariant} to={to} {...rest}>
      {children}
    </StyledLink>
  );
};

export default Link;
