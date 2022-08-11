import React from 'react';
import './App.scss';

import Header from './components/Header';
import Routing from './config/Routing';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="wrapper">
      <Header></Header>
      <main className="main">
        <Routing></Routing>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default App;
