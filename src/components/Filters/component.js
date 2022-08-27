import React, { useState, useEffect } from 'react';
import './index.scss';
import Button from '../Button';

import { useParams, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/api';

import { useDispatch, useSelector } from 'react-redux';
import { setMovies, setPage } from '../../redux/slices/moviesSlice';

import queryString from 'query-string';
import { addGenres, addSort } from '../../redux/slices/filtersSlice';

export const sortList = [
  {
    name: 'Popularity Ascending',
    sortProperty: 'popularity.asc',
  },
  {
    name: 'Popularity Descending',
    sortProperty: 'popularity.desc',
  },
  {
    name: 'Rating Ascending',
    sortProperty: 'vote_avarage.asc',
  },
  {
    name: 'Rating Descending',
    sortProperty: 'vote_avarage.desc',
  },
  {
    name: 'Release Date Ascending',
    sortProperty: 'primary_release_date.asc',
  },
  {
    name: 'Release Date Descending',
    sortProperty: 'primary_release_date.desc',
  },
  {
    name: 'Title [A-Z]',
    sortProperty: 'original_title.asc',
  },
  {
    name: 'Title [Z-A]',
    sortProperty: 'original_title.desc',
  },
];

const motionSettings = {
  variants: {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  },
  duration: {
    duration: 0.8,
    ease: [0.04, 0.62, 0.23, 0.98],
  },
};

const Filters = () => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [genres, setGenres] = useState([]);

  const { with_genres, sort_by } = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category } = useParams();

  useEffect(() => {
    api
      .getGenres(category, { params: {} })
      .then((response) => setGenres(response.genres));
  }, []);

  const onClickButton = () => {
    const params = {
      with_genres: with_genres,
      sort_by: sort_by.sortProperty,
    };
    dispatch(setPage(1));
    api.getDiscover(category, { params }).then((response) => {
      dispatch(setMovies(response.results));
    });

    const queryURL = queryString.stringify(
      {
        with_genres,
        sort_by: sort_by.sortProperty,
      },
      { arrayFormat: 'comma' }
    );
    navigate(`?${queryURL}`);
  };

  const addGenre = (e, genre) => {
    //we need to check if our genres includes current genre id, we should delete it or we are adding id in array
    dispatch(addGenres(genre.id));
    e.target.classList.toggle('active');
  };

  const sortAction = (obj) => {
    dispatch(addSort(obj));
  };

  return (
    <div className="filters">
      <FilterPanel title="Sort">
        <motion.div
          className="dropdown"
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={motionSettings.variants}
          transition={motionSettings.duration}
        >
          <div className="dropdown__title">Sort Results By</div>
          <motion.div
            className="dropdown__btn"
            initial={false}
            onClick={() => setIsOpenSelect((prev) => !prev)}
          >
            {sort_by.name}
          </motion.div>
          <AnimatePresence>
            {isOpenSelect && (
              <motion.div
                className="dropdown__content"
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={motionSettings.variants}
                transition={motionSettings.duration}
              >
                {sortList.map((obj) => (
                  <div
                    className={`dropdown__item ${
                      obj.name === sort_by.name ? 'active' : ''
                    }`}
                    key={obj.sortProperty}
                    onClick={() => sortAction(obj)}
                  >
                    {obj.name}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </FilterPanel>
      <FilterPanel title="Filters">
        <motion.div
          className="genres"
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={motionSettings.variants}
          transition={motionSettings.duration}
        >
          {genres?.map((genre) => (
            <div
              key={genre.id}
              className={`genres__label ${
                with_genres?.includes(genre.id) ? 'active' : ''
              }`}
              onClick={(e) => addGenre(e, genre)}
            >
              {genre.name}
            </div>
          ))}
        </motion.div>
      </FilterPanel>
      <Button onClick={onClickButton}>Submit</Button>
    </div>
  );
};

const FilterPanel = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`filters__panel panel mb-2`}>
      <motion.h5
        className="panel__title"
        initial={false}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {title}
      </motion.h5>
      <AnimatePresence initial={false}>{isOpen && children}</AnimatePresence>
    </div>
  );
};

export default Filters;
