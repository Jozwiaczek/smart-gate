import React from 'react';

import { LeftRight, RightLeft, StyledButton } from './CloseButton.styled';

const CloseButton = (props: CloseButtonProps) => (
  <StyledButton data-testid="closeButton" {...props}>
    <LeftRight />
    <RightLeft />
  </StyledButton>
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
