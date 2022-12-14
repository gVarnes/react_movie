import React, { useState, useEffect, memo } from 'react';
import './index.scss';
import undefinedImage from './undefined_image.png';

import { Link, useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import api, { category, sortType } from '../../api/api';
import apiConfig from '../../api/apiConfig';

const RowCards = ({ sortCondition, movieOrTv = 'movie', time = 'day' }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (sortCondition === 'popular') {
      api
        .getList(category[movieOrTv], sortType[sortCondition], { params: {} })
        .then((response) => setCards(response.results));
    } else {
      api
        .getTrending(category.movie, time, { params: {} })
        .then((response) => setCards(response.results));
    }
  }, [movieOrTv, time]);

  return (
    <Swiper
      grabCursor={true}
      spaceBetween={10}
      breakpoints={{
        0: { slidesPerView: 2 },
        600: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        900: { slidesPerView: 5 },
        1024: { slidesPerView: 5.5 },
        1100: { slidesPerView: 6.5 },
      }}
    >
      {cards &&
        cards.map((movie, i) => (
          <SwiperSlide key={movie.id} className="row__card">
            <Card {...movie} movieOrTv={movieOrTv}></Card>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export const Card = ({
  backdrop_path,
  id,
  title,
  vote_average,
  name,
  poster_path,
  movieOrTv,
  recClass,
}) => {
  const { category } = useParams();
  const imagePath = backdrop_path ? backdrop_path : poster_path;
  //category can be undefined on main page so it shoulde use variable from cardrow component for identify
  return (
    <div className="card">
      <div className="card__rating">{Math.round(vote_average * 10) / 10}</div>
      <div className={`card__image ${recClass}`}>
        <Link to={`/${category ? category : movieOrTv}/${id}`}>
          <img
            src={imagePath ? apiConfig.w500Image(imagePath) : undefinedImage}
            alt={title}
          />
        </Link>
      </div>
      <div className="card__title">
        <Link to={`/movie/${id}`}>{title ? title : name}</Link>
      </div>
    </div>
  );
};

export default memo(RowCards);
