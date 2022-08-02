import React, { useState, useEffect } from 'react';

import { Grid } from '@mui/material';
import { Container } from '@mui/system';

import GridItem from './GridItem';

import { Routes, Route } from 'react-router-dom';
import FilmPage from './FilmPage';

const MainContent = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=3796f44e00425ed7f9ce24e5c32086ef'
    )
      .then((data) => data.json())
      .then((res) => {
        setMovies(res.results);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <GridItem {...movie} key={movie.id}></GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default MainContent;
