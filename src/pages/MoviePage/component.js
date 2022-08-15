import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CastList from '../../components/CastList';
import TrailersList from '../../components/TrailersList';

import './index.scss';

const MoviePage = () => {
  const [film, setFilm] = useState('');
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = cast.length;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=3796f44e00425ed7f9ce24e5c32086ef&language=en-US`
    )
      .then((data) => data.json())
      .then((res) => {
        setFilm(res);
        setIsLoading(false);
      });
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3796f44e00425ed7f9ce24e5c32086ef&language=en-US`
    )
      .then((data) => data.json())
      .then((res) => setCast(res.cast));
  }, [id]);

  return (
    film && (
      <>
        <div
          className="banner"
          style={{
            backgroundImage:
              'url(https://image.tmdb.org/t/p/w1280' + film.backdrop_path,
          }}
        ></div>
        <div className="movie-content container mb-3">
          <div className="movie-content__poster">
            <div
              className="movie-content__poster-img"
              style={{
                backgroundImage:
                  'url(https://image.tmdb.org/t/p/w1280' + film.poster_path,
              }}
            ></div>
          </div>
          <div className="movie-content__info">
            <h1 className="movie-content__title">{film.title}</h1>
            <div className="movie-content__genres">
              {film.genres.map((genre, i) => (
                <span className="movie-content__genres-item" key={i}>
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="movie-content__overview">{film.overview}</div>
          </div>
          <div className="movie-content__cast cast-content">
            <h2 className="cast-content__title">Casts</h2>
            <CastList></CastList>
          </div>
        </div>
        <TrailersList></TrailersList>
      </>
    )
  );
};

export default MoviePage;
