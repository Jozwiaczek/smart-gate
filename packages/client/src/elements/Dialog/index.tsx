import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { useHotkeys } from '../../hooks';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { CloseButton } from '../buttons';
import {
  CardContent,
  ChildrenWrapper,
  CloseButtonWrapper,
  Description,
  Overlay,
  StyledCard,
  Title,
  Wrapper,
} from './Dialog.styled';
import { DialogProps } from './Dialog.types';

const Dialog = ({ children, isOpen = false, close, title, description }: DialogProps) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(cardRef, close);
  useHotkeys('Escape', close);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <Wrapper data-testid="dialog">
      <StyledCard ref={cardRef}>
        <CardContent>
          <CloseButtonWrapper>
            <CloseButton autoFocus onClick={close} />
          </CloseButtonWrapper>
          {title && <Title>{t(title as never)}</Title>}
          {description && <Description>{t(description as never)}</Description>}
          {children && <ChildrenWrapper>{children}</ChildrenWrapper>}
        </CardContent>
      </StyledCard>
      <Overlay isVisible={isOpen} />
    </Wrapper>,
    document.body,
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;
