import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';

import { StylesProvider } from '../theme';

const AllTheProviders: FC = ({ children }) => <StylesProvider>{children}</StylesProvider>;

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
