import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isAuthenticated } from '../../utils';
import MainLayout from '../mainLayout';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated()
        ? (
          <MainLayout>
            <Component {...props} />
          </MainLayout>
        )
        : (
          <Redirect to={{
            pathname: '/login',
          }}
          />
        )
    )}
  />
);
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
PrivateRoute.defaultProps = {
};

export default PrivateRoute;
