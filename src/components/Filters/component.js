import React, { useState, useEffect } from 'react';
import './index.scss';

import { useForm } from 'react-hook-form';

import Button from '../Button';

import { useParams } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/api';

import { useDispatch } from 'react-redux';
import { setMovies } from '../../redux/slices/moviesSlice';

const Filters = ({ setItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { category } = useParams();

  const onSubmit = (data) => {
    const params = {};
    Object.entries(data).forEach((item) => {
      params[item[0]] = item[1].join(',');
    });

    api.getDiscover(category, { params }).then((response) => {
      dispatch(setMovies(response.results));
    });
  };

  useEffect(() => {
    api
      .getGenres(category, { params: {} })
      .then((response) => setGenres(response.genres));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="filters-form">
      <div className={`filters-form__panel panel mb-2`}>
        <motion.h5
          className="panel__title"
          initial={false}
          //  animate={{ backgroundColor: isOpen ? '#FF0088' : '#0055FF' }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Filters
        </motion.h5>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              className="panel__body"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              {genres?.map((genre) => (
                <label
                  key={genre.id}
                  className={`panel__label`}
                  onClick={(e) => {
                    e.target.classList.toggle('active');
                  }}
                >
                  <input
                    {...register('with_genres')}
                    type="checkbox"
                    value={genre.id}
                    className="panel__input"
                  />
                  {genre.name}
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Button>Submit</Button>
    </form>
  );
};

export default Filters;
