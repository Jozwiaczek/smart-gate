import React from 'react';
import { useLocation } from 'react-router-dom';

import { routes } from '../../constants';
import { Copyright } from '../../elements';
import { Container } from './DefaultLayout.styled';
import { DefaultLayoutProps } from './DefaultLayout.types';

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { pathname } = useLocation();

  return (
    <Container>
      <main>{children}</main>
      {pathname === routes.home && (
        <footer>
          <Copyright />
        </footer>
      )}
    </Container>
  );
};

export default DefaultLayout;
