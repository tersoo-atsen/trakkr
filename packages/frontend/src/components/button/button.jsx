import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './button.scss';

const Button = (props) => {
  const {
    label,
    type,
    classes,
    path,
  } = props;
  return (
    <Link to={path} className={`button ${type} ${classes}`}>
      {label}
    </Link>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

Button.defaultProps = {
  classes: '',
};

export default Button;
