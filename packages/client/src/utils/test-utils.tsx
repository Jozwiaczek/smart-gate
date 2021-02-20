import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';

import { StylesProvider } from '../theme';

const AllTheProviders: FC = ({ children }) => <StylesProvider>{children}</StylesProvider>;

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
