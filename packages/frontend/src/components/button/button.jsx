import React from 'react';
import PropTypes from 'prop-types';

import './button.scss';

const Button = (props) => {
  const { label, type } = props;
  return (
    <button className={`button ${type}`}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Button;
