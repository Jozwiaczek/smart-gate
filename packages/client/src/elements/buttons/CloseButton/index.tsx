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
    color={color}
    hoverColor={hoverColor}
    size={size}
    {...rest}
  >
    <LeftRight />
    <RightLeft />
  </StyledButton>
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
