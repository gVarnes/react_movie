import React, { useState, useEffect } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';

const CastList = () => {
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3796f44e00425ed7f9ce24e5c32086ef&language=en-US`
    )
      .then((data) => data.json())
      .then((res) => setCast(res.cast.slice(0, 20)));
  }, [id]);

  return (
    <div className="cast-content__swiper">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{ 600: { slidesPerView: 4 }, 900: { slidesPerView: 6 } }}
      >
        {cast.map((actor, i) => (
          <SwiperSlide key={i} className="cast-content__slide">
            <h5 className="cast-content__name">{actor.name}</h5>
            <img
              className="cast-content__image"
              src={'https://image.tmdb.org/t/p/w1280' + actor.profile_path}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CastList;
