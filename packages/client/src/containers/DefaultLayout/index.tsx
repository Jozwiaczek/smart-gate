import React from 'react';

import { Copyright } from '../../elements';
import { Container } from './DefaultLayout.styled';
import { DefaultLayoutProps } from './DefaultLayout.types';

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <Container>
    <main>{children}</main>
    <footer>
      <Copyright />
    </footer>
  </Container>
);

export default DefaultLayout;
