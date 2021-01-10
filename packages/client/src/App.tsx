import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './api/AuthProvider';
import AxiosProvider from './api/AxiosProvider';
import SignIn from './containers';
import { StylesProvider } from './theme';

const App = () => (
  <StylesProvider>
    <AxiosProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn} />
          </Switch>
        </Router>
      </AuthProvider>
    </AxiosProvider>
  </StylesProvider>
);

export default App;
