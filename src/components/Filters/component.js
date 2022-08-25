import React, { useState, useEffect } from 'react';
import './index.scss';
import Button from '../Button';

import { useForm } from 'react-hook-form';

import { useParams, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/api';

import { useDispatch, useSelector } from 'react-redux';
import { setMovies } from '../../redux/slices/moviesSlice';

import queryString from 'query-string';
import { setFilters, addGenres } from '../../redux/slices/filtersSlice';

const sortList = [
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

const Filters = ({ value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  // const [filters, setFilters] = useState({
  //   with_genres: [],
  // });
  const { with_genres } = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { category } = useParams();

  useEffect(() => {
    api
      .getGenres(category, { params: {} })
      .then((response) => setGenres(response.genres));
  }, []);

  const onClick = () => {
    const params = { with_genres };
    api.getDiscover(category, { params }).then((response) => {
      dispatch(setMovies(response.results));
    });

    const queryURL = queryString.stringify(
      { with_genres },
      { arrayFormat: 'comma' }
    );
    navigate(`?${queryURL}`);
  };

  const addGenre = (e, genre) => {
    //we need to check if our genres includes current genre id, we should delete it or we are adding id in array
    dispatch(addGenres(genre.id));
    e.target.classList.toggle('active');
  };

  return (
    <div className="filters-form">
      <div className={`filters-form__panel panel mb-2`}>
        <motion.h5
          className="panel__title"
          initial={false}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Sort
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
              {sortList?.map((sort) => (
                <div
                  key={sort.sortProperty}
                  className={`panel__label`}
                  // onClick={(e) => addGenre(e, genre)}
                >
                  <div className={`panel__input`} />
                  {sort.name}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      ==================
      {/* <div className={`filters-form__panel panel mb-2`}>
        <motion.h5
          className="panel__title"
          initial={false}
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
                <div
                  key={genre.id}
                  className={`panel__label`}
                  onClick={(e) => addGenre(e, genre)}
                >
                  <div className={`panel__input`} />
                  {genre.name}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}
      <Button onClick={onClick}>Submit</Button>
    </div>
  );
};

//========================================================================================================================================================

// const Filters = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [genres, setGenres] = useState([]);
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     getValues,
//   } = useForm();

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { category } = useParams();

//   useEffect(() => {
//     api
//       .getGenres(category, { params: {} })
//       .then((response) => setGenres(response.genres));
//   }, []);

//   //========================================================================================================================================================

//   useEffect(() => {
//     if (window.location.search) {
//       const queryURL = queryString.parse(window.location.search.substring(1));
//       console.log(queryURL);
//     }
//   }, []);

//   //========================================================================================================================================================

//   const onSubmit = (data) => {
//     const params = {};
//     Object.entries(data).forEach((item) => {
//       params[item[0]] = item[1].join(',');
//     });

//     api.getDiscover(category, { params }).then((response) => {
//       dispatch(setMovies(response.results));
//     });
//   };

//   //getting all values and look after some keys that we change
//   const values = getValues();
//   useEffect(() => {
//     const queryURL = queryString.stringify(values, { arrayFormat: 'comma' });
//     navigate(`?${queryURL}`), { replace: true };
//   }, [values['with_genres']]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="filters-form">
//       <div className={`filters-form__panel panel mb-2`}>
//         <motion.h5
//           className="panel__title"
//           initial={false}
//           onClick={() => setIsOpen((prev) => !prev)}
//         >
//           Filters
//         </motion.h5>
//         <AnimatePresence initial={false}>
//           {isOpen && (
//             <motion.div
//               key="content"
//               initial="collapsed"
//               animate="open"
//               exit="collapsed"
//               className="panel__body"
//               variants={{
//                 open: { opacity: 1, height: 'auto' },
//                 collapsed: { opacity: 0, height: 0 },
//               }}
//               transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
//             >
//               {genres?.map((genre) => (
//                 <label
//                   key={genre.id}
//                   className={`panel__label`}
//                   onClick={(e) => {
//                     e.target.classList.toggle('active');
//                   }}
//                 >
//                   <input
//                     {...register('with_genres')}
//                     type="checkbox"
//                     value={genre.id}
//                     className="panel__input"
//                   />
//                   {genre.name}
//                 </label>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//       <Button>Submit</Button>
//     </form>
//   );
// };

export default Filters;
