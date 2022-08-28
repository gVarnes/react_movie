import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import './index.scss';

import { useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/scss/pagination';

import parse from 'html-react-parser';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { category, id } = useParams();

  useEffect(() => {
    api
      .getReviews(category, id)
      .then((response) => setReviews(response.results));
  }, []);

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  return (
    <>
      <div className="reviews-content__nav">
        <div className="reviews-content__title">Social</div>
        <div className="reviews-content__nav-item">Reviews</div>
      </div>
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={1}
        autoHeight={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
      >
        {reviews?.map((review) => {
          const date = new Date(Date.parse(review.created_at));
          const month = months[date.getMonth()];
          const year = date.getFullYear();
          const day = date.getDate();
          return (
            <SwiperSlide
              className="reviews-content__body body-reviews"
              key={review.id}
            >
              <div className="body-reviews__author">
                <div className="body-reviews__avatar">
                  {review.author_details.avatar_path ? (
                    <img
                      src={review.author_details.avatar_path.substring(1)}
                      alt=""
                    />
                  ) : (
                    <span className="body-reviews__avatar_name">
                      {review.author.substring(0, 1).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="body-reviews__name">
                  A review by {review.author}
                </div>
                {review.author_details.rating && (
                  <div className="body-reviews__rating">
                    {review.author_details.rating}.0
                  </div>
                )}
                <div className="body-reviews__date">
                  Written by {review.author} on {month} {day}, {year}
                </div>
              </div>
              <div className="body-reviews__message">
                {parse(review.content)}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default MovieReviews;
