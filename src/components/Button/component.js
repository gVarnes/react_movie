import React from 'react';
import './index.scss';

import PropTypes from 'prop-types';

const Button = ({ btnClass, outlineClass, children, onClick }) => {
  return (
    <button className={`btn ${btnClass} ${outlineClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.prototype = {
  btnClass: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string,
  outlineClass: PropTypes.string,
};

export default Button;
