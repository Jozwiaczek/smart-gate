import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import { DefaultLayout } from '../containers';
import i18n from '../i18n';
import { AuthProvider, AxiosProvider } from './api';
import SnackbarProvider from './SnackbarProvider';
import StylesProvider from './StylesProvider';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <StylesProvider>
    <AxiosProvider>
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <SnackbarProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </SnackbarProvider>
        </I18nextProvider>
      </AuthProvider>
    </AxiosProvider>
  </StylesProvider>
);

export default Providers;