import React from 'react';
import './App.scss';

import Header from './components/Header';
import Routing from './config/Routing';

const App = () => {
  return (
    <>
      <Header></Header>
      <Routing></Routing>
    </>
  );
};

export default App;
