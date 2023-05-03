import './loadSentry';
import './loadPolyfills';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Providers from './providers';
import Routes from './routes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </StrictMode>,
);

serviceWorkerRegistration.register();

// reportWebVitals(); TODO: setup analytics: https://github.com/Jozwiaczek/smart-gate/issues/145
