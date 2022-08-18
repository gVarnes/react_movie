import React, { useState, useEffect } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';

import api, { category } from '../../api/api';
import apiConfig from '../../api/apiConfig';

import CastList from '../../components/CastList';
import TrailersList from '../../components/TrailersList';

const MoviePage = () => {
  const [movie, setFilm] = useState('');
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    api.detail(category.movie, id, { params: {} }).then((response) => {
      setFilm(response);
    });
    api.credits(category.movie, id).then((response) => setCast(response.cast));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundImage: `url(${apiConfig.originalImage(
            movie.backdrop_path
          )})`,
        }}
      ></div>
      <div className="movie-content container mb-3">
        <div className="movie-content__poster">
          <div
            className="movie-content__poster-img"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                movie.poster_path || movie.backdrop_path
              )})`,
            }}
          ></div>
        </div>
        <div className="movie-content__info">
          <h1 className="movie-content__title">{movie.title}</h1>
          <div className="movie-content__genres">
            {movie.genres?.map((genre, i) => (
              <span className="movie-content__genres-item" key={i}>
                {genre.name}
              </span>
            ))}
          </div>
          <div className="movie-content__overview">{movie.overview}</div>
        </div>
        <div className="movie-content__cast cast-content">
          <h2 className="cast-content__title">Casts</h2>
          <CastList></CastList>
        </div>
      </div>
      <TrailersList></TrailersList>
    </>
  );
};

export default MoviePage;
