import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './api/AuthProvider';
import AxiosProvider from './api/AxiosProvider';
import { Dashboard, SignIn, SignUp } from './containers';
import EnablePlatformAuth from './containers/EnablePlatformAuth';
import { SnackbarProvider } from './providers';
import { StylesProvider } from './theme';

const App = () => (
  <StylesProvider>
    <AxiosProvider>
      <AuthProvider>
        <SnackbarProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route path="/registration" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/enablePlatformAuth" component={EnablePlatformAuth} />
            </Switch>
          </Router>
        </SnackbarProvider>
      </AuthProvider>
    </AxiosProvider>
  </StylesProvider>
);

export default App;
