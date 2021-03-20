import React from 'react';

import { RippleEffect } from '../../animations';
import { StyledButton } from './ButtonIcon.styled';
import { IconButtonProps } from './ButtonIcon.types';

const IconButton = ({ children, disabled, ...rest }: IconButtonProps) => (
  <StyledButton disabled={disabled} data-testid="icon-button" {...rest}>
    {children}
    {!disabled && <RippleEffect />}
  </StyledButton>
);

IconButton.displayName = 'IconButton';

export default IconButton;
