import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import MoviePage from '../pages/MoviePage';
import MovieGrid from '../components/MovieGrid';
import NotFound from '../pages/NotFound/component';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/:category/:id" element={<MoviePage />}></Route>
      <Route path="/catalog/:category" element={<MovieGrid />}></Route>
      <Route
        path="/catalog/:category/search/:keyword"
        element={<MovieGrid />}
      ></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default Routing;
