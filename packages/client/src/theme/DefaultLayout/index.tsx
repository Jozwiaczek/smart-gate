import { Box } from '@material-ui/core';
import React, { ReactNode } from 'react';
import Copyright from '../../elements';
import { Container } from './DefaultLayout.styled';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <Container>
    <main>{children}</main>
    <footer>
      <Box mb={3}>
        <Copyright />
      </Box>
    </footer>
  </Container>
);

export default DefaultLayout;
