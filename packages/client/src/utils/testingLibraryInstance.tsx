import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';
import SnackbarProvider from '../providers/SnackbarProvider';
import StylesProvider from '../providers/StylesProvider';

const AllTheProviders: FC = ({ children }) => (
  <StylesProvider>
    <I18nextProvider i18n={i18n}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </I18nextProvider>
  </StylesProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

export * from '@testing-library/react';

export { customRender as render };
