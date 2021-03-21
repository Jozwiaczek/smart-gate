import React, { useEffect } from 'react';
import i18n from '../../src/i18n';
import { I18nextProvider } from 'react-i18next';

const I18nDecorator = (StoryFn, { globals }) => {
  useEffect(() => {
    i18n.changeLanguage(globals.locale);
  }, [i18n, globals]);

  return (
    <I18nextProvider i18n={i18n}>
      <StoryFn />
    </I18nextProvider>
  );
};

export default I18nDecorator;
