import React, { useState, useEffect } from 'react';
import './index.scss';

import { useParams } from 'react-router-dom';

import { Card } from '../RowCards/component';
import Button from '../Button';
import ReactPaginate from 'react-paginate';
import api, { sortType } from '../../api/api';

const MovieGrid = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotapPages] = useState(0);

  const { category } = useParams();

  useEffect(() => {
    const params = { page };
    api.getList(category, sortType.top_rated, { params }).then((response) => {
      setItems(response.results);
      if (response.total_pages >= 500) {
        setTotapPages(500);
      } else {
        setTotapPages(response.total_pages);
      }
    });
  }, [category]);

  const handleClick = () => {
    const params = { page: page + 1 };

    api.getList(category, sortType.top_rated, { params }).then((response) => {
      setItems((prev) => [...prev, ...response.results]);
    });
    setPage(page + 1);
  };

  const handlePageClick = (data) => {
    const params = { page: page + 1 };

    api.getList(category, sortType.top_rated, { params }).then((response) => {
      setItems(response.results);
    });
    setPage(data.selected + 1);
  };

  return (
    <section className="catalog container mb-3">
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
