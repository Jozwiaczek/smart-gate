import GlobalStyles from '../src/theme/GlobalStyles';
import { getTheme, ThemeType } from '../src/theme/Theme';
import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import i18n from '../src/i18n';
import { I18nextProvider } from 'react-i18next';
import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
};

addDecorator((story) => (
  <I18nextProvider i18n={i18n}>
    <GlobalStyles />
    {story()}
  </I18nextProvider>
));

const themes = [getTheme(ThemeType.dark), getTheme(ThemeType.light)];
addDecorator(withThemesProvider(themes));
