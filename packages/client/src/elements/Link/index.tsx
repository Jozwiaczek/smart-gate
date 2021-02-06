import React from 'react';
import { StyledLink, StyledOutLink } from './Link.styled';
import { LinkProps } from './Link.types';

const Link = ({ children, to, asOuterLink, color = 'primary', ...rest }: LinkProps) => {
  if (asOuterLink) {
    return (
      <StyledOutLink color={color} href={to} to="" rel="noreferrer" target="_blank">
        {children}
      </StyledOutLink>
    );
  }

  return (
    <StyledLink color={color} to={to} {...rest}>
      {children}
    </StyledLink>
  );
};

export default Link;
