import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { environments } from '../constants';
import resources from './resources';

export enum SGLocale {
  pl = 'pl',
  en = 'en',
}

const { STORYBOOK, NODE_ENV } = process.env;

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: SGLocale.en,
    supportedLngs: Object.values(SGLocale),
    debug: !STORYBOOK && NODE_ENV === environments.DEV,
  });

export default i18n;
