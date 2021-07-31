import React from 'react';
import { useTranslation } from 'react-i18next';

import { HeaderWrapper, Wrapper } from './SettingsSection.styled';
import { SettingsSectionProps } from './SettingsSection.tyles';

const SettingsSection = ({ title, titleIcon, children }: SettingsSectionProps) => {
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

export default SettingsSection;
