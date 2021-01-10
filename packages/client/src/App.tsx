import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApiProvider from './api/ApiProvider';
import SignIn from './containers';
import { StylesProvider } from './theme';

const App = () => (
  <StylesProvider>
    <ApiProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={SignIn} />
        </Switch>
      </Router>
    </ApiProvider>
  </StylesProvider>
);

export default App;
