import React, { useEffect, useState } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideItem from '../SlideItem/component';

import './index.scss';
import 'swiper/scss';

const Carousel = () => {
  const [movies, setMovies] = useState([]);

  SwiperCore.use([Autoplay]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=3796f44e00425ed7f9ce24e5c32086ef&page=1'
    )
      .then((data) => data.json())
      .then((res) => setMovies(res.results.slice(0, 4)));
  }, []);

  return (
    <div className="slider" style={{ marginBottom: '3rem' }}>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 3000 }}
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
