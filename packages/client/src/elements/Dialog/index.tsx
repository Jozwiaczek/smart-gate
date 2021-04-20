import React from 'react';

import { CloseButton } from '../buttons';
import { CloseButtonWrapper, Overlay, StyledCard, Wrapper } from './Dialog.styled';
import { DialogProps } from './Dialog.types';

const Dialog = ({ children, open = false, onClose }: DialogProps) => (
  <Wrapper data-testid="dialog">
    <StyledCard>
      <CloseButtonWrapper>
        <CloseButton />
      </CloseButtonWrapper>
      <h2>Title</h2>
      <p>Description</p>
      {children}
    </StyledCard>
    <Overlay />
  </Wrapper>
);

Dialog.displayName = 'Dialog';

export default Dialog;
