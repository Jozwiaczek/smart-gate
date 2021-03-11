import React, { forwardRef } from 'react';

import useAnimated from '../../../hooks/useAnimated';
import { BackgroundSideLogo } from '../../index';
import DefaultLayout from '../DefaultLayout';
import { CardWrapper, StyledActionsContainer, StyledCard } from './AuthLayout.styled';
import { ActionsContainerProps, AuthLayoutProps } from './AuthLayout.types';

export const Container = forwardRef<HTMLDivElement, AuthLayoutProps>(({ children }, ref) => {
  const animatedCard = useAnimated<HTMLDivElement>({ type: 'fadeIn' });

  return (
    <DefaultLayout data-testid="authLayout">
      <BackgroundSideLogo />
      <CardWrapper ref={animatedCard.ref}>
        <StyledCard ref={ref}>{children}</StyledCard>
      </CardWrapper>
    </DefaultLayout>
  );
});

export const ActionsContainer = ({ children, direction = 'column' }: ActionsContainerProps) => (
  <StyledActionsContainer direction={direction}>{children}</StyledActionsContainer>
);

export default {
  Container,
  ActionsContainer,
};
