import React from 'react';

import { Routes, Route } from 'react-router-dom';

// import 'swiper/swiper.min.css';

import Home from '../pages/Home';
import FilmPage from '../pages/Filmpage';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route path="/film/:id" element={<FilmPage />}></Route>
    </Routes>
  );
};

export default Routing;
