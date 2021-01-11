import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './api/AuthProvider';
import AxiosProvider from './api/AxiosProvider';
import { Dashboard, SignIn, SignUp } from './containers';
import { StylesProvider } from './theme';

const App = () => (
  <StylesProvider>
    <AxiosProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/registration" component={SignUp} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </AuthProvider>
    </AxiosProvider>
  </StylesProvider>
);

export default App;
