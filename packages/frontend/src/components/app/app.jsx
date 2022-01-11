import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Routes from '../../utils/routes';
import LandingPage from '../landingPage';
import NotFoundPage from '../notFoundPage';
import ConnectedLogin from '../login';
import Signup from '../signup';
import ConnectedDashboard from '../dashboard';
import ConnectedItems from '../items';
import PrivateRoute from '../privateRoute';
import ConnectedActivity from '../activity';
import ConnectedUserProfile from '../userProfile';
import AddItem from '../addItem';
import EditItem from '../editItem';

const App = () => (
  <Switch>
    <Route exact path={Routes.home} component={LandingPage} />
    <Route path={Routes.login} component={ConnectedLogin} />
    <Route path={Routes.signup} component={Signup} />
    <PrivateRoute path={Routes.dashboard} component={ConnectedDashboard} />
    <PrivateRoute path={Routes.items} component={ConnectedItems} />
    <PrivateRoute path={Routes.activity} component={ConnectedActivity} />
    <PrivateRoute path={Routes.profile} component={ConnectedUserProfile} />
    <PrivateRoute path={Routes.addItem} component={AddItem} />
    <PrivateRoute path={Routes.editItem} component={EditItem} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
