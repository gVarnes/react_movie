import React, { useRef } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

import AppButton from '../AppButton';
import Button from '../Button/component';

const Header = () => {
  const headerRef = useRef(null);
  const shrinkHeader = () => {
    if (
      document.body.scrollTop() > 100 ||
      document.documentElement.scrollTop() > 100
    ) {
      headerRef.current.classList.add('shrink');
    } else {
      headerRef.current.classList.remove('shrink');
    }
  };

  return (
    <header ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">News</Link>
        </div>
        <div className="header__nav">
          <ul className="header__list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>About</li>
            <li>About</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
