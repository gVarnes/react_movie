import React, { useState, useEffect } from 'react';
import './index.scss';

import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import { Card } from '../RowCards/component';
import Button from '../Button';
import Filters from '../Filters';
import MovieSearch from '../MovieSearch';

import ReactPaginate from 'react-paginate';
import api, { sortType } from '../../api/api';

import { useSelector, useDispatch } from 'react-redux';
import {
  setMovies,
  setTotalPages,
  setPage,
} from '../../redux/slices/moviesSlice';

//========================================================================================================================================================
import { setFilters } from '../../redux/slices/filtersSlice';

import queryString from 'query-string';
import { useRef } from 'react';

const MovieGrid = () => {
  // it is needed for checking if it is a first render or not. I set it on true if dispatch(setFilters) has done
  const isSort = useRef(false);
  const { category, keyword } = useParams();

  const { movies, totalPages, page } = useSelector((state) => state.movies);
  const { with_genres } = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //=======================================================================================================================================================
  const [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  useEffect(() => {
    if (window.location.search) {
      const queryURL = queryString.parse(window.location.search.substring(1));
      dispatch(setFilters(queryURL));
      isSort.current = true;
    }
    console.log(location);
  }, [location]);

  useEffect(() => {
    console.log(with_genres);
    console.log(isSort.current);
    // its an audit
    if (!isSort.current) {
      if (keyword === undefined) {
        const params = {
          page,
          with_genres,
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
      const params = { page: page + 1, with_genres };
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
      const params = { page: e.selected + 1, with_genres };
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
    console.log(movies);
  }, [movies]);

  //========================================================================================================================================================

  // useEffect(() => {
  //   const params = { page };
  //   if (keyword === undefined) {
  //     api.getList(category, sortType.top_rated, { params }).then((response) => {
  //       dispatch(setMovies(response.results));
  //       if (response.total_pages >= 500) {
  //         dispatch(setTotalPages(500));
  //       } else {
  //         dispatch(setTotalPages(response.total_pages));
  //       }
  //     });
  //   } else {
  //     const params = {
  //       page,
  //       query: keyword,
  //     };
  //     api.search(category, { params }).then((response) => {
  //       dispatch(setMovies(response.results));
  //       dispatch(setTotalPages(response.total_pages));
  //     });
  //   }
  // }, [category, keyword]);

  // const loadMore = () => {
  //   if (keyword === undefined) {
  //     const params = { page: page + 1 };
  //     api.getList(category, sortType.top_rated, { params }).then((response) => {
  //       dispatch(setMovies([...movies, ...response.results]));
  //     });
  //     dispatch(setPage(page + 1));
  //   } else {
  //     const params = {
  //       page: page + 1,
  //       query: keyword,
  //     };
  //     api.search(category, { params }).then((response) => {
  //       dispatch(setMovies([...movies, ...response.results]));
  //     });
  //     dispatch(setPage(page + 1));
  //   }
  // };

  // const handlePageClick = (e) => {
  //   if (keyword === undefined) {
  //     const params = { page: e.selected + 1 };
  //     api.getList(category, sortType.top_rated, { params }).then((response) => {
  //       dispatch(setMovies(response.results));
  //     });
  //     dispatch(setPage(e.selected + 1));
  //   } else {
  //     const params = {
  //       page: page + 1,
  //       query: keyword,
  //     };
  //     api.search(category, { params }).then((response) => {
  //       dispatch(setMovies(response.results));
  //     });
  //     dispatch(setPage(e.selected + 1));
  //   }
  // };

  return (
    <section className="catalog container mb-3">
      {/* <div className="catalog__filters">
        <Filters></Filters>
      </div> */}
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
