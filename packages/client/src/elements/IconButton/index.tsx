import React from 'react';

import { StyledIconButton } from './IconButton.styled';
import { IconButtonProps } from './IconButton.types';

const IconButton = ({ children, ...rest }: IconButtonProps) => (
  <StyledIconButton {...rest}>{children}</StyledIconButton>
);

export default IconButton;
