import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useHotkeys } from '../../hooks';
import useAnimated from '../../hooks/useAnimated';
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
  const cardAnimation = useAnimated<HTMLDivElement>({
    type: 'slideInUp',
    opt: { autoTrigger: false, animationOpt: { delay: 1000 } },
  });
  useOnClickOutside(cardAnimation.ref, close);
  useHotkeys('Escape', close);

  useLayoutEffect(() => {
    if (isOpen) {
      cardAnimation.trigger();
    }
  }, [cardAnimation, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Wrapper data-testid="dialog">
      <StyledCard ref={cardAnimation.ref}>
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
    </Wrapper>
  );
};

Dialog.displayName = 'Dialog';

export default Dialog;
