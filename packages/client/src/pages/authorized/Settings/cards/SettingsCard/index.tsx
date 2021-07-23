import React from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderWrapper, Wrapper } from './SettingsCard.styled';
import { SettingsCardProps } from './SettingsCard.tyles';

const SettingsCard = ({ title, titleIcon, children }: SettingsCardProps) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <HeaderWrapper>
        {titleIcon && titleIcon}
        <h2>{t(title as never)}</h2>
      </HeaderWrapper>
      {children}
    </Wrapper>
  );
};

export default SettingsCard;
