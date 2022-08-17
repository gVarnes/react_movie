import React, { useEffect, useState } from 'react';
import './index.scss';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import SlideItem from '../SlideItem';

import api, { category, sortType } from '../../api/api';

const Carousel = () => {
  const [movies, setMovies] = useState([]);

  SwiperCore.use([Autoplay]);

  useEffect(() => {
    const params = { page: 1 };
    api
      .getList(category.movie, sortType.popular, { params })
      .then((response) => setMovies(response.results.slice(0, 4)));
  }, []);

  return (
    <div className="slider" style={{ marginBottom: '3rem' }}>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movies.map((movie, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <SlideItem
                movie={movie}
                isActiveClass={`${isActive ? 'active' : ''}`}
              ></SlideItem>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
