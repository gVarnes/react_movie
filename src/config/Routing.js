import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from '../components/Home';
import FilmPage from '../components/FilmPage';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/film/:id" element={<FilmPage />}></Route>
    </Routes>
  );
};

export default Routing;
