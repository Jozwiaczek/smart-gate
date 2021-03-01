import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';
import { StylesProvider } from '../theme';
import AuthProvider from './api/AuthProvider';
import AxiosProvider from './api/AxiosProvider';
import SnackbarProvider from './SnackbarProvider';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <StylesProvider>
    <AxiosProvider>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </I18nextProvider>
      </AuthProvider>
    </AxiosProvider>
  </StylesProvider>
);

export default Providers;
