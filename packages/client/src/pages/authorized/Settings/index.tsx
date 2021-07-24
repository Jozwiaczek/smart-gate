import React from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '../AuthorizedPages.styled';
import Account from './sections/Account';
import LanguageCard from './sections/LanguageCard';
import LogoutSection from './sections/LogoutSection';
import Privileges from './sections/Privileges';
import ThemeCard from './sections/ThemeCard';
import {
  FitSectionsWrapper,
  SectionsWrapper,
  WideSectionsWrapper,
  Wrapper,
} from './Settings.styled';

const Settings = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Title>{t('routes.settings.title')}</Title>
      <SectionsWrapper>
        <WideSectionsWrapper>
          <Account />
          <Privileges />
        </WideSectionsWrapper>
        <FitSectionsWrapper>
          <ThemeCard />
          <LanguageCard />
          <LogoutSection />
        </FitSectionsWrapper>
      </SectionsWrapper>
    </Wrapper>
  );
};

export default Settings;
