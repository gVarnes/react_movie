import React from 'react';

import Carousel from '../components/Carousel';
import MovieSearch from '../components/MovieSearch';
import Row from '../components/Row';

const Home = () => {
  return (
    <div className="home">
      <Carousel></Carousel>
      <MovieSearch></MovieSearch>
      <Row></Row>
    </div>
  );
};

export default Home;
