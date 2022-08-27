import React, { useState, useEffect, useRef } from 'react';
import './index.scss';

import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { Card } from '../RowCards/component';
import Button from '../Button';
import Filters from '../Filters';
import MovieSearch from '../MovieSearch';
import { sortList } from '../Filters/component';

import ReactPaginate from 'react-paginate';
import api from '../../api/api';

import { useSelector, useDispatch } from 'react-redux';
import {
  setMovies,
  setTotalPages,
  setPage,
} from '../../redux/slices/moviesSlice';
import { setFilters } from '../../redux/slices/filtersSlice';

//========================================================================================================================================================

const MovieGrid = () => {
  // it is needed for checking if it is a first render or not. I set it on true if dispatch(setFilters) has done
  const isSort = useRef(false);
  const { category, keyword } = useParams();

  const { movies, totalPages, page } = useSelector((state) => state.movies);
  const { with_genres, sort_by } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (window.location.search) {
      const queryURL = queryString.parse(window.location.search.substring(1));

      // finding what object is equal to current sort in queryURL, that i add this obj to redux store
      const sort = sortList.find(
        (obj) => obj.sortProperty === queryURL.sort_by
      );

      dispatch(
        setFilters({
          ...queryURL,
          // I am checking if queryURL has this parametr so i change it to array and each element to Number, if has not
          // i set in redux pure array
          with_genres: queryURL.with_genres
            ? queryURL.with_genres.split(',').map((item) => Number(item))
            : [],
          sort_by: sort,
        })
      );
      isSort.current = true;
    }
  }, [location]);

  useEffect(() => {
    // its an audit that if was the first render?
    if (!isSort.current) {
      if (keyword === undefined) {
        const params = {
          page,
          with_genres,
          sort_by: sort_by.sortProperty,
        };

        api.getDiscover(category, { params }).then((response) => {
          dispatch(setMovies(response.results));
          if (response.total_pages >= 500) {
            dispatch(setTotalPages(500));
          } else {
            dispatch(setTotalPages(response.total_pages));
          }
        });
      } else {
        const params = {
          page,
          query: keyword,
        };
        api.search(category, { params }).then((response) => {
          dispatch(setMovies(response.results));
          dispatch(setTotalPages(response.total_pages));
        });
      }
    }
    isSort.current = false;
  }, [category, keyword, with_genres]);

  const loadMore = () => {
    if (keyword === undefined) {
      const params = {
        page: page + 1,
        with_genres,
        sort_by: sort_by.sortProperty,
      };
      api.getDiscover(category, { params }).then((response) => {
        dispatch(setMovies([...movies, ...response.results]));
      });
      dispatch(setPage(page + 1));
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      api.search(category, { params }).then((response) => {
        dispatch(setMovies([...movies, ...response.results]));
      });
      dispatch(setPage(page + 1));
    }
  };

  const handlePageClick = (e) => {
    if (keyword === undefined) {
      const params = {
        page: e.selected + 1,
        with_genres,
        sort_by: sort_by.sortProperty,
      };
      api.getDiscover(category, { params }).then((response) => {
        dispatch(setMovies(response.results));
      });
      dispatch(setPage(e.selected + 1));
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      api.search(category, { params }).then((response) => {
        dispatch(setMovies(response.results));
      });
      dispatch(setPage(e.selected + 1));
    }
  };

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <section className="catalog container">
      <div className="catalog__filters">
        <Filters></Filters>
      </div>
      <div className="catalog__body">
        <MovieSearch></MovieSearch>
        <div className="movie-grid">
          {movies?.map((item) => (
            <Card key={item.id} {...item}></Card>
          ))}
        </div>
        {page < totalPages ? (
          <div className="movie-grid__loadmore mb-2">
            <Button onClick={loadMore}>Load more</Button>
          </div>
        ) : null}
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          previousLabel="<"
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          renderOnZeroPageCount={null}
        ></ReactPaginate>
      </div>
    </section>
  );
};

export default MovieGrid;
