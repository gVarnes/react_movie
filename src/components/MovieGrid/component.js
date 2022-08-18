import React, { useState, useEffect } from 'react';
import './index.scss';

import { useParams } from 'react-router-dom';

import { Card } from '../RowCards/component';
import Button from '../Button';
import ReactPaginate from 'react-paginate';
import api, { sortType } from '../../api/api';
import MovieSearch from '../MovieSearch';

const MovieGrid = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotapPages] = useState(0);

  const { category, keyword } = useParams();
  console.log('rerender');
  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    const params = { page };
    if (keyword === undefined) {
      api.getList(category, sortType.top_rated, { params }).then((response) => {
        setItems(response.results);
        if (response.total_pages >= 500) {
          setTotapPages(500);
        } else {
          setTotapPages(response.total_pages);
        }
      });
    } else {
      const params = {
        query: keyword,
      };
      api.search(category, { params }).then((response) => {
        setItems(response.results);
        setTotapPages(response.total_pages);
      });
    }
  }, [category, keyword]);

  const handleClick = () => {
    if (keyword === undefined) {
      const params = { page: page + 1 };
      api.getList(category, sortType.top_rated, { params }).then((response) => {
        setItems((prev) => [...prev, ...response.results]);
      });
      setPage(page + 1);
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      api.search(category, { params }).then((response) => {
        setItems((prev) => [...prev, ...response.results]);
      });
      setPage(page + 1);
    }
  };

  const handlePageClick = () => {
    if (keyword === undefined) {
      const params = { page: page + 1 };
      api.getList(category, sortType.top_rated, { params }).then((response) => {
        setItems(response.results);
      });
      setPage(page + 1);
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      api.search(category, { params }).then((response) => {
        setItems(response.results);
      });
      setPage(page + 1);
    }
  };

  return (
    <section className="catalog container mb-3">
      <MovieSearch></MovieSearch>
      <div className="movie-grid">
        {items?.map((item) => (
          <Card key={item.id} {...item}></Card>
        ))}
      </div>
      {page < totalPages ? (
        <div className="movie-grid__loadmore mb-2">
          <Button onClick={handleClick}>Load more</Button>
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
    </section>
  );
};

export default MovieGrid;
