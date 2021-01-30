import React, { ReactNode } from 'react';
import { Copyright } from '../../elements';
import { Container } from './DefaultLayout.styled';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <Container>
    <main>{children}</main>
    <footer>
      <Copyright />
    </footer>
  </Container>
);

export default DefaultLayout;
