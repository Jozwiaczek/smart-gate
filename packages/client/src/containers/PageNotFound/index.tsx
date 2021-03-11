import React, { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { routes } from '../../constants';
import { Button, CardLayout, Heaven, Hell } from '../../elements';
import { useCurrentUser, useThemeType } from '../../hooks';
import { ThemeType } from '../../theme/Theme';
import { ContentWrapper, Description, IllustrationWrapper, Title } from './PageNotFound.styled';

const PageNotFound = () => {
  const { t } = useTranslation();
  const { themeType } = useThemeType();
  const [currentUser] = useCurrentUser();
  const illustrationWrapperRef = useRef<HTMLDivElement>(null);
  const [illustrationHeight, setIllustrationHeight] = useState(0);
  const isLightTheme = themeType === ThemeType.light;

  useLayoutEffect(() => {
    if (illustrationWrapperRef && illustrationWrapperRef.current) {
      setIllustrationHeight(illustrationWrapperRef.current.clientHeight);
    }
  }, []);

  return (
    <CardLayout.Container>
      <Title>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: t('routes.pageNotFound.title') }} />
      </Title>
      <ContentWrapper illustrationHeight={illustrationHeight}>
        <IllustrationWrapper ref={illustrationWrapperRef}>
          {isLightTheme ? <Heaven /> : <Hell />}
        </IllustrationWrapper>
        <Description illustrationHeight={illustrationHeight}>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: t('routes.pageNotFound.description') }} />
        </Description>
      </ContentWrapper>
      <Button
        to={currentUser ? routes.home : routes.login}
        fullWidth
        withArrow
        colorVariant={isLightTheme ? 'blue' : 'red'}
      >
        {t('routes.pageNotFound.goTo')}
        {currentUser ? t('routes.pageNotFound.dashboard') : t('routes.pageNotFound.loginPage')}
      </Button>
    </CardLayout.Container>
  );
};

export default PageNotFound;
