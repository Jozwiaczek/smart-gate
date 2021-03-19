import './loadSentry';
import './loadPolyfills';

import React from 'react';
import ReactDOM from 'react-dom';

import Providers from './providers';
import Routes from './routes';
import * as serviceWorkerRegistration from './serviceWorker/serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();

// reportWebVitals(); TODO: setup analytics: https://github.com/Jozwiaczek/smart-gate/issues/145
