import React, { useState, useEffect } from 'react';
import './index.scss';
import undefined_image from './undefined_image.png';

import { useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import api, { category } from '../../api/api';
import apiConfig from '../../api/apiConfig';

const CastList = () => {
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    api.credits(category.movie, id).then((response) => setCast(response.cast));
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
              className={`cast-content__image`}
              src={
                actor.profile_path
                  ? `${apiConfig.w500Image(actor.profile_path)}`
                  : undefined_image
              }
              alt={actor.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CastList;
