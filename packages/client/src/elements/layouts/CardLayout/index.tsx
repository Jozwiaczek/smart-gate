import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import useAnimated from '../../../hooks/useAnimated';
import { BackgroundSideLogo } from '../../index';
import DefaultLayout from '../DefaultLayout';
import {
  BackIcon,
  BackLink,
  BackLinkWrapper,
  CardContentWrapper,
  CardWrapper,
  StyledActionsContainer,
  StyledCard,
} from './CardLayout.styled';
import { ActionsContainerProps, BackLinkProps, CardLayoutProps } from './CardLayout.types';

const BackTransitionLink = ({ to, withTransition }: BackLinkProps) => {
  const { t } = useTranslation();
  return (
    <BackLinkWrapper>
      <BackLink to={to} colorVariant="default" transition={withTransition}>
        <BackIcon /> {t('actions.back')}
      </BackLink>
    </BackLinkWrapper>
  );
};

export const Container = forwardRef<HTMLDivElement, CardLayoutProps>(({ back, children }, ref) => {
  const animatedCard = useAnimated<HTMLDivElement>({ type: 'fadeIn' });

  return (
    <DefaultLayout data-testid="authLayout">
      <BackgroundSideLogo />
      <CardWrapper ref={animatedCard.ref}>
        {back && BackTransitionLink(back)}
        <CardContentWrapper>
          <StyledCard ref={ref}>{children}</StyledCard>
        </CardContentWrapper>
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
