import React from 'react';
import './index.scss';

import PropTypes from 'prop-types';

const Button = ({ btnClass, small, search, children, onClick }) => {
  return (
    <button className={`btn ${btnClass} ${small} ${search}`} onClick={onClick}>
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
