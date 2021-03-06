import React, { useLayoutEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { routes } from '../../../constants';
import { Button, CardLayout, Heaven, Hell } from '../../../elements';
import { useCurrentUser, useThemeType } from '../../../hooks';
import { ThemeType } from '../../../theme/Theme';
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
        <Trans i18nKey="routes.pageNotFound.title" components={{ b: <b /> }} />
      </Title>
      <ContentWrapper illustrationHeight={illustrationHeight}>
        <IllustrationWrapper ref={illustrationWrapperRef}>
          {isLightTheme ? (
            <Heaven data-testid="heaven-animation" />
          ) : (
            <Hell data-testid="hell-animation" />
          )}
        </IllustrationWrapper>
        <Description illustrationHeight={illustrationHeight}>
          <Trans i18nKey="routes.pageNotFound.description" components={{ b: <b /> }} />
        </Description>
      </ContentWrapper>
      <Button
        data-testid="btn-404-nav"
        to={currentUser ? routes.authorized.appBar.HOME : routes.unauthorized.LOGIN}
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
