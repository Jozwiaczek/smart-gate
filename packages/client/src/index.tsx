import React from 'react';
import ReactDOM from 'react-dom';

import Providers from './providers';
import reportWebVitals from './reportWebVitals';
import Routes from './Routes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

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
