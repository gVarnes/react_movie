import React, { useRef } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const headerNav = [
  { title: 'Home', path: '/' },
  { title: 'Movies', path: '/catalog/movie' },
  { title: 'TV', path: '/catalog/tv' },
];

const Header = () => {
  const headerRef = useRef(null);
  const { pathname } = useLocation();

  const active = headerNav.findIndex((item) => item.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };

    window.addEventListener('scroll', shrinkHeader);

    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <header ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">Movies</Link>
        </div>
        <div className="header__nav">
          <ul className="header__list">
            {headerNav.map((item, i) => (
              <li
                key={item.title}
                className={`${i === active ? 'active' : ''}`}
              >
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
