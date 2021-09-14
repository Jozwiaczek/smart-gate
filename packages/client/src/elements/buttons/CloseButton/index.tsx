import React from 'react';

import { LeftRight, RightLeft, StyledButton } from './CloseButton.styled';
import { CloseButtonProps } from './CloseButton.types';

const CloseButton = ({
  color = 'text-secondary',
  hoverColor = 'red',
  size = '21px',
  ...rest
}: CloseButtonProps) => (
  <StyledButton
    data-testid="closeButton"
    {...rest}
    color={color}
    hoverColor={hoverColor}
    size={size}
  >
    <LeftRight />
    <RightLeft />
  </StyledButton>
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
