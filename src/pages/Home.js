import React from 'react';

import Carousel from '../components/Carousel';
import MovieSearch from '../components/MovieSearch';
import Row from '../components/Row';

const Home = () => {
  return (
    <>
      <Carousel></Carousel>
      <MovieSearch></MovieSearch>
      <Row></Row>
    </>
  );
};

export default Home;
