import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

const Button = (props) => {
  const { label, type, classes } = props;
  return (
    <button className={`button ${type} ${classes}`}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

Button.defaultProps = {
  classes: '',
};

export default Button;
