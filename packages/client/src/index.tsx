import React from 'react';
import ReactDOM from 'react-dom';

import Providers from './providers';
import Routes from './Routes';
import * as serviceWorkerRegistration from './serviceWorker/serviceWorkerRegistration';
import reportWebVitals from './utils/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();

reportWebVitals();
