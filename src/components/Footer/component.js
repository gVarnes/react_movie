import React from 'react';
import './index.scss';

import { Link } from 'react-router-dom';
import bg from './bg.jpg';

const footerNav = [
  { title: 'Home', path: '/' },
  { title: 'Contacts us', path: '/contacts' },
  { title: 'About us', path: '/about' },
];

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer-content content-footer container">
        <div className="content-footer__logo">
          <div className="logo">
            <Link to="/">Movies</Link>
          </div>
        </div>
        <div className="content-footer__body">
          <ul className="content-footer__list">
            {footerNav.map((item, i) => (
              <li
                key={item.title}
                className="content-footer__list-item"
                // className={`${i === active ? 'active' : ''}`}
              >
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
