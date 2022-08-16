import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import MoviePage from '../pages/MoviePage';
import MovieGrid from '../components/MovieGrid';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/movie/:id" element={<MoviePage />}></Route>
      <Route path="/catalog/:category" element={<MovieGrid />}></Route>
    </Routes>
  );
};

export default Routing;
