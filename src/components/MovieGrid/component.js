import React, { useState, useEffect } from 'react';
import './index.scss';

import { useParams } from 'react-router-dom';

import { Card } from '../RowCards/component';
import Button from '../Button';
import ReactPaginate from 'react-paginate';

const MovieGrid = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotapPages] = useState(0);

  const { category } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${category}/top_rated?api_key=3796f44e00425ed7f9ce24e5c32086ef&page=${page}`
    )
      .then((data) => data.json())
      .then((res) => {
        setItems(res.results);
        if (res.total_pages >= 500) {
          setTotapPages(500);
        } else {
          setTotapPages(res.total_pages);
        }
      });
  }, [category]);

  const handleClick = () => {
    setPage(page + 1);
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=3796f44e00425ed7f9ce24e5c32086ef&page=${
        page + 1
      }`
    )
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setItems((prev) => [...prev, ...res.results]);
      });
  };

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=3796f44e00425ed7f9ce24e5c32086ef&page=${
        data.selected + 1
      }`
    )
      .then((data) => data.json())
      .then((res) => {
        setItems(res.results);
      });
  };

  return (
    <section className="catalog container mb-3">
      <div className="movie-grid">
        {items && items.map((item, i) => <Card key={item.id} {...item}></Card>)}
      </div>
      {page < totalPages ? (
        <div className="movie-grid__loadmore mb-2">
          <Button onClick={handleClick}>Load more</Button>
        </div>
      ) : null}
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="<"
        renderOnZeroPageCount={null}
      ></ReactPaginate>
    </section>
  );
};

export default MovieGrid;
