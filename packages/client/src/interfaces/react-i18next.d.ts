import 'react-i18next';

import resources from '../i18n/resources';

declare module 'react-i18next' {
  type DefaultResources = typeof resources['en'];
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Resources extends DefaultResources {}
}
