import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './containers';
import { StylesProvider } from './theme';

const App = () => (
  <StylesProvider>
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
      </Switch>
    </Router>
  </StylesProvider>
);

export default App;
