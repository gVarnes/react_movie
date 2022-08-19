import React from 'react';
import './MovieGrid/index.scss';

import { useSelector } from 'react-redux/es/exports';

const Pagination = ({ totalPages, onClick }) => {
  const pageNumbers = [];

  const { page } = useSelector((state) => state.movies);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      <li onClick={() => onClick(page - 2)}>prev</li>
      {pageNumbers.map((number) => (
        <li
          className={`pagination__item ${page === number ? 'active' : ''}`}
          key={number}
          onClick={() => onClick(number)}
        >
          {number}
        </li>
      ))}
      <li onClick={() => onClick(page + 1)}>next</li>
    </ul>
  );
};

export default Pagination;
