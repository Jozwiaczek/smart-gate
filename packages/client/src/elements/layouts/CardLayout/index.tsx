import React, { forwardRef } from 'react';

import useAnimated from '../../../hooks/useAnimated';
import { BackgroundSideLogo } from '../../index';
import DefaultLayout from '../DefaultLayout';
import {
  CardWrapper,
  StyledActionsContainer,
  StyledCard,
  StyledDescription,
  StyledTitle,
} from './CardLayout.styled';
import {
  ActionsContainerProps,
  CardLayoutProps,
  DescriptionProps,
  TitleProps,
} from './CardLayout.types';

export const Container = forwardRef<HTMLDivElement, CardLayoutProps>(({ children }, ref) => {
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

const ActionsContainer = ({ children, direction = 'column' }: ActionsContainerProps) => (
  <StyledActionsContainer direction={direction}>{children}</StyledActionsContainer>
);

const Title = ({ children }: TitleProps) => <StyledTitle>{children}</StyledTitle>;

const Description = ({ children }: DescriptionProps) => (
  <StyledDescription>{children}</StyledDescription>
);

export default {
  Container,
  ActionsContainer,
  Title,
  Description,
};
