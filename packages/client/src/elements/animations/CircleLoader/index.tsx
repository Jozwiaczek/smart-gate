import React from 'react';
import { useTranslation } from 'react-i18next';

import { ThunderIcon } from '../../../icons';
import { BackgroundCircle, ContentWrapper, Indicator, Label, Wrapper } from './CircleLoader.styled';

const CircleLoader = ({ size = 250, label }: CircleLoaderProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper data-testid="circleLoader" size={size}>
      <BackgroundCircle size={size} />
      <Indicator size={size} />
      <ContentWrapper>
        <ThunderIcon />
        <Label>{t(label)}</Label>
      </ContentWrapper>
    </Wrapper>
  );
};

CircleLoader.displayName = 'CircleLoader';

export default CircleLoader;
