import React from 'react';
import './index.scss';

import PropTypes from 'prop-types';

const Button = ({ btnClass, outlineClass, children, actionOnClick }) => {
  return (
    <button
      className={`btn ${btnClass} ${outlineClass}`}
      onClick={actionOnClick}
    >
      {children}
    </button>
  );
};

Button.prototype = {
  btnClass: PropTypes.string,
  actionOnClick: PropTypes.func,
  children: PropTypes.string,
  outlineClass: PropTypes.string,
};

export default Button;
