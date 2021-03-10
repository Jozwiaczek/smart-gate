import React, { forwardRef } from 'react';

import useAnimated from '../../../hooks/useAnimated';
import { BackgroundSideLogo } from '../../index';
import DefaultLayout from '../DefaultLayout';
import { StyledActionsContainer, StyledCard } from './AuthLayout.styled';
import { ActionsContainerProps, AuthLayoutProps } from './AuthLayout.types';

export const Container = forwardRef<HTMLDivElement, AuthLayoutProps>(({ children }, ref) => {
  const animatedBackgroundLogo = useAnimated<SVGSVGElement>({
    type: 'fadeIn',
    opt: { animationOpt: { delay: 100 } },
  });
  return (
    <DefaultLayout data-testid="authLayout">
      <BackgroundSideLogo ref={animatedBackgroundLogo.ref} />
      <StyledCard ref={ref}>{children}</StyledCard>
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
