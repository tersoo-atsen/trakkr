import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

import './error.scss';

const Error = (props) => {
  const { message } = props;
  return (
    <div className="error-page-wrapper">
      <div className="error-page_inner">
        <div className="content-wrapper is-centered">
          <h3 className="error-message">{message}</h3>
          <p className="error-description">
            Sorry the page you are looking is temporarily unavailable and
            we are working to fix the problem. We should be up and running shortly.
          </p>
          <Link className="try-again" to="/">Go Home</Link>
        </div>
      </div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
