import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isAuthenticated } from '../../utils';


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      isAuthenticated()
        ? <Component {...props} />
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
