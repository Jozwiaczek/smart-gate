import React from 'react';
import ReactDOM from 'react-dom';

import Providers from './providers';
import Routes from './routes';
import * as serviceWorkerRegistration from './serviceWorker/serviceWorkerRegistration';
import reportWebVitals from './utils/reportWebVitals';

// Load Polyfills
(async () => {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer');
  }
})();

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
