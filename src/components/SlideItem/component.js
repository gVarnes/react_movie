import React from 'react';

import { Link } from 'react-router-dom';

import Button from '../Button';
import './index.scss';

const MovieSlideItem = ({ movie, isActiveClass }) => {
  const background =
    'https://image.tmdb.org/t/p/original' + movie.backdrop_path;

  return (
    <div
      className={`slider-item ${isActiveClass}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="slider-item__content content-item container">
        <div className="content-item__info">
          <h2 className="content-item__title">{movie.title}</h2>
          <div className="content-item__overview">{movie.overview}</div>
          <div className="content-item__buttons">
            <Link to={`/film/${movie.id}`}>
              <Button>View details</Button>
            </Link>
            <Button outlineClass="outline">Watch</Button>
          </div>
        </div>
        <div className="content-item__poster">
          <img
            src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default MovieSlideItem;
