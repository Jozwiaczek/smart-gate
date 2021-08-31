import React from 'react';

import { LeftRight, RightLeft, StyledButton } from './CloseButton.styled';
import { CloseButtonProps } from './CloseButton.types';

const CloseButton = ({ color = 'text-secondary', size = '21px', ...rest }: CloseButtonProps) => (
  <StyledButton data-testid="closeButton" color={color} size={size} {...rest}>
    <LeftRight />
    <RightLeft />
  </StyledButton>
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
