import React from 'react';
import './index.scss';

import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';

import Button from '../Button';

const MovieSlideItem = ({ movie, isActiveClass }) => {
  const background = apiConfig.originalImage(movie.backdrop_path);

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
            <Link to={`/movie/${movie.id}`}>
              <Button>View details</Button>
            </Link>
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
