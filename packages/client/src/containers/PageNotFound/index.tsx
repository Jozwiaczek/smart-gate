import React, { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '../../constants';
import { AuthLayout, Button } from '../../elements';
import { useCurrentUser, useThemeType } from '../../hooks';
import { HeavenIllustration, HellIllustration } from '../../icons';
import { ThemeType } from '../../theme/Theme';
import { ContentWrapper, Description, IllustrationWrapper, Title } from './PageNotFound.styled';

const PageNotFound = () => {
  const { t } = useTranslation();
  const { themeType } = useThemeType();
  const [currentUser] = useCurrentUser();
  const illustrationWrapperRef = useRef<HTMLDivElement>(null);
  const [illustrationHeight, setIllustrationHeight] = useState(0);

  useLayoutEffect(() => {
    if (illustrationWrapperRef && illustrationWrapperRef.current) {
      setIllustrationHeight(illustrationWrapperRef.current.clientHeight);
    }
  }, []);

  return (
    <AuthLayout.Container>
      <Title>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: t('routes.pageNotFound.title') }} />
      </Title>
      <ContentWrapper illustrationHeight={illustrationHeight}>
        <IllustrationWrapper ref={illustrationWrapperRef}>
          {themeType === ThemeType.light ? <HeavenIllustration /> : <HellIllustration />}
        </IllustrationWrapper>
        <Description illustrationHeight={illustrationHeight}>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: t('routes.pageNotFound.description') }} />
        </Description>
      </ContentWrapper>
      <Button
        to={routes.home}
        fullWidth
        withArrow
        colorVariant={themeType === ThemeType.light ? 'blue' : 'red'}
      >
        {t('routes.pageNotFound.goTo')}
        {currentUser ? t('routes.pageNotFound.dashboard') : t('routes.pageNotFound.loginPage')}
      </Button>
    </AuthLayout.Container>
  );
};

export default PageNotFound;
