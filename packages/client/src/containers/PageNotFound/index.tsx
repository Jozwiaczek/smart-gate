import React, { useLayoutEffect, useRef, useState } from 'react';

import { routes } from '../../constants';
import { AuthLayout, Button } from '../../elements';
import { useCurrentUser, useThemeType } from '../../hooks';
import { HeavenIllustration, HellIllustration } from '../../icons';
import { ThemeType } from '../../theme/Theme';
import { ContentWrapper, Description, IllustrationWrapper, Title } from './PageNotFound.styled';

const PageNotFound = () => {
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
        Oops, Seems it’s <br />
        <b>Wrong gate</b>
      </Title>
      <ContentWrapper illustrationHeight={illustrationHeight}>
        <IllustrationWrapper ref={illustrationWrapperRef}>
          {themeType === ThemeType.light ? <HeavenIllustration /> : <HellIllustration />}
        </IllustrationWrapper>
        <Description illustrationHeight={illustrationHeight}>
          We are sorry, but the <b>page</b> you
          <br /> requested <b>was not found</b>.
        </Description>
      </ContentWrapper>
      <Button
        to={routes.home}
        fullWidth
        withArrow
        colorVariant={themeType === ThemeType.light ? 'blue' : 'red'}
      >
        Go to {currentUser ? 'dashboard' : 'login page'}
      </Button>
    </AuthLayout.Container>
  );
};

export default PageNotFound;
