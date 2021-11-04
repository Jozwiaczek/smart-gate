import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  BackgroundCircle,
  ContentWrapper,
  Indicator,
  Label,
  Thunder,
  Wrapper,
} from './CircleLoader.styled';

const CircleLoader = ({ variant, label }: CircleLoaderProps) => {
  const { t } = useTranslation();
  const isLarge = variant === 'large';
  const size = isLarge ? 250 : 100;

  return (
    <Wrapper data-testid="circleLoader" size={size}>
      <BackgroundCircle size={size} />
      <Indicator size={size} />
      <ContentWrapper>
        <Thunder isLarge={isLarge} />
        {isLarge && label && <Label>{t(label)}</Label>}
      </ContentWrapper>
    </Wrapper>
  );
};

CircleLoader.displayName = 'CircleLoader';

export default CircleLoader;
