import React from 'react';
import { useLocation } from 'react-router-dom';

import { routes } from '../../../constants';
import { Copyright } from '../../index';
import { Container } from './DefaultLayout.styled';
import { DefaultLayoutProps } from './DefaultLayout.types';

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { pathname } = useLocation();

  return (
    <Container>
      <main>{children}</main>
      {pathname === routes.login && (
        <footer>
          <Copyright />
        </footer>
      )}
    </Container>
  );
};

export default DefaultLayout;
