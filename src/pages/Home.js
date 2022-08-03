import React, { useState, useEffect } from 'react';

import { Grid } from '@mui/material';

import GridItem from '../components/GridItem';
import Carousel from '../components/Carousel';

const Home = () => {
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
    <>
      <Carousel></Carousel>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <GridItem {...movie} key={movie.id}></GridItem>
        ))}
      </Grid>
    </>
  );
};

export default Home;
