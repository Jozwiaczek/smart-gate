import React from 'react';
import { useLocation } from 'react-router-dom';

import { routes } from '../../../constants';
import { Copyright } from '../../index';
import { Container } from './GlobalLayout.styled';
import { GlobalLayoutProps } from './GlobalLayout.types';

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
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

export default GlobalLayout;
