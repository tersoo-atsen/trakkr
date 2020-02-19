import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../../utils/routes';
import LandingPage from '../landingPage';
import ConnectedLogin from '../login';
import NotFoundPage from '../notFoundPage';

const App = () => (
  <Switch>
    <Route exact path={routes.home} component={LandingPage} />
    <Route path={routes.login} component={ConnectedLogin} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
