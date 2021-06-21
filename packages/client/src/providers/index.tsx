import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';
import {
  AuthProvider,
  AxiosProvider,
  CurrentUserProvider,
  ReactQueryProvider,
  WebSocketProvider,
} from './api';
import SnackbarProvider from './SnackbarProvider';
import StylesProvider from './StylesProvider';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <CurrentUserProvider>
    <AxiosProvider>
      <AuthProvider>
        <WebSocketProvider>
          <ReactQueryProvider>
            <StylesProvider>
              <I18nextProvider i18n={i18n}>
                <SnackbarProvider>{children}</SnackbarProvider>
              </I18nextProvider>
            </StylesProvider>
          </ReactQueryProvider>
        </WebSocketProvider>
      </AuthProvider>
    </AxiosProvider>
  </CurrentUserProvider>
);

export default Providers;
