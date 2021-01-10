import Box from '@material-ui/core/Box';
import React, { ReactNode } from 'react';
import Copyright from '../elements';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => (
  <>
    <main>{children}</main>
    <footer>
      <Box mt={8}>
        <Copyright />
      </Box>
    </footer>
  </>
);

export default DefaultLayout;
