import React, { forwardRef } from 'react';

import { BackgroundSideLogo } from '../../index';
import DefaultLayout from '../DefaultLayout';
import { StyledActionsContainer, StyledCard } from './AuthLayout.styled';
import { ActionsContainerProps, AuthLayoutProps } from './AuthLayout.types';

export const Container = forwardRef<HTMLDivElement, AuthLayoutProps>(({ children }, ref) => (
  <DefaultLayout data-testid="authLayout">
    <BackgroundSideLogo />
    <StyledCard ref={ref}>{children}</StyledCard>
  </DefaultLayout>
));

export const ActionsContainer = ({ children, direction = 'column' }: ActionsContainerProps) => (
  <StyledActionsContainer direction={direction}>{children}</StyledActionsContainer>
);

export default {
  Container,
  ActionsContainer,
};
