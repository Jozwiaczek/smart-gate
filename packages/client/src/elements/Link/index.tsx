import React from 'react';

import { StyledLink, StyledOutLink } from './Link.styled';
import { LinkProps } from './Link.types';

const Link = ({
  children,
  to,
  asOuterLink,
  title,
  colorVariant = 'default',
  ...rest
}: LinkProps) => {
  if (asOuterLink) {
    return (
      <StyledOutLink
        $colorVariant={colorVariant}
        href={to}
        to=""
        title={title}
        rel="noreferrer noopener"
        target="_blank"
        {...rest}
      >
        {children}
      </StyledOutLink>
    );
  }

  return (
    <StyledLink title={title} $colorVariant={colorVariant} to={to} {...rest}>
      {children}
    </StyledLink>
  );
};

export default Link;
