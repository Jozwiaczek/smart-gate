import { create } from '@storybook/theming';
import { addons } from '@storybook/addons';
import logo from '../public/email-images/sg-logo.png';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandUrl: 'https://github.com/Jozwiaczek/smart-gate',
    brandImage: logo,
    fontBase: '"Roboto", sans-serif',
    colorPrimary: '#EAECED',
    colorSecondary: '#257D69',
  }),
});
