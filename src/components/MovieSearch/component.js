import React, { useState, useCallback } from 'react';
import Button from '../Button';
import './index.scss';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MovieSearch = () => {
  const [keyword, setKeyword] = useState('');

  //if category undefined (actually it was done for home page), category equal movie
  const { category = 'movie' } = useParams();

  const navigate = useNavigate();

  const goToSearch = () => {
    navigate(`/catalog/${category}/search/${keyword}`, { replace: true });
  };

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="container">
      <div className="movie-search mb-2">
        <input
          type="text"
          className="movie-search__input"
          placeholder="Search"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <Button small="small" onClick={goToSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default MovieSearch;
