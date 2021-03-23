import React from 'react';

import { RippleEffect } from '../../animations';
import { StyledButton } from './IconButton.styled';
import { IconButtonProps } from './IconButton.types';

const IconButton = ({ children, color = '#fff', disabled, ...rest }: IconButtonProps) => (
  <StyledButton color={color} disabled={disabled} data-testid="icon-button" {...rest}>
    {children}
    {!disabled && <RippleEffect />}
  </StyledButton>
);

IconButton.displayName = 'IconButton';

export default IconButton;
