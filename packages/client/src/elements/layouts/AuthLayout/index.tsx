import React, { forwardRef } from 'react';

import useAnimated from '../../../hooks/useAnimated';
import { BackgroundSideLogo } from '../../index';
import DefaultLayout from '../DefaultLayout';
import {
  BackIcon,
  BackLink,
  BackLinkWrapper,
  CardWrapper,
  StyledActionsContainer,
  StyledCard,
} from './AuthLayout.styled';
import { ActionsContainerProps, AuthLayoutProps, BackLinkProps } from './AuthLayout.types';

const BackTransitionLink = ({ to, withTransition }: BackLinkProps) => (
  <BackLinkWrapper>
    <BackLink to={to} colorVariant="default" transition={withTransition}>
      <BackIcon /> back
    </BackLink>
  </BackLinkWrapper>
);

export const Container = forwardRef<HTMLDivElement, AuthLayoutProps>(({ back, children }, ref) => {
  const animatedBackgroundLogo = useAnimated<SVGSVGElement>({
    type: 'fadeIn',
    opt: { animationOpt: { delay: 100 } },
  });
  return (
    <DefaultLayout data-testid="authLayout">
      <BackgroundSideLogo ref={animatedBackgroundLogo.ref} />
      <CardWrapper>
        {back && BackTransitionLink(back)}
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
