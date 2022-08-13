import React, { useState, useEffect } from 'react';
import './index.scss';

import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

const RowCards = ({ condition = 'movie', movieOrTv, time = 'day' }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (condition === 'popular') {
      fetch(
        `https://api.themoviedb.org/3/${movieOrTv}/popular?api_key=3796f44e00425ed7f9ce24e5c32086ef`
      )
        .then((data) => data.json())
        .then((res) => {
          setCards(res.results);
        });
    } else {
      console.log('trand');
      fetch(
        `https://api.themoviedb.org/3/trending/movie/${time}?api_key=3796f44e00425ed7f9ce24e5c32086ef`
      )
        .then((data) => data.json())
        .then((res) => {
          setCards(res.results);
        });
    }
  }, [movieOrTv, time]);

  return (
    <Swiper
      grabCursor={true}
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        0: { slidesPerView: 3 },
        600: { slidesPerView: 4 },
        900: { slidesPerView: 5.5 },
        1024: { slidesPerView: 7.5 },
      }}
    >
      {cards &&
        cards.map((movie, i) => (
          <SwiperSlide key={movie.id} className="row__item item-row">
            <Card {...movie}></Card>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

const Card = ({ backdrop_path, id, title, vote_average, name }) => {
  return (
    <>
      <div className="item-row__rating">
        {Math.round(vote_average * 10) / 10}
      </div>
      <div className="item-row__image">
        <Link to={`/film/${id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w220_and_h330_face${backdrop_path}`}
            alt=""
          />
        </Link>
      </div>
      <div className="item-row__title">
        <Link to={`/film/${id}`}>{title ? title : name}</Link>
      </div>
    </>
  );
};

export default RowCards;