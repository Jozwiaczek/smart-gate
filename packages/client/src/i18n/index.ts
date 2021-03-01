import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import resources from './resources';

export enum SGLocale {
  pl = 'pl',
  en = 'en',
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: SGLocale.en,
    supportedLngs: Object.values(SGLocale),
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
