import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../../utils/routes';
import LandingPage from '../landingPage';
import NotFoundPage from '../notFoundPage';
import ConnectedLogin from '../login';
import Signup from '../signup';
import ConnectedDashboard from '../dashboard';
import Items from '../items';
import PrivateRoute from '../privateRoute';


const App = () => (
  <Switch>
    <Route exact path={routes.home} component={LandingPage} />
    <Route path={routes.login} component={ConnectedLogin} />
    <Route path={routes.signup} component={Signup} />
    <PrivateRoute path={routes.dashboard} component={ConnectedDashboard} />
    <PrivateRoute path={routes.items} component={Items} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
