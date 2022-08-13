import React, { useState, useRef } from 'react';
import './index.scss';

import RowCards from '../RowCards/component';

const Row = () => {
  const [movieOrTv, setMovieOrTv] = useState('movie');
  const [timeTv, setTimeTv] = useState('day');
  const inputMovieRef = useRef(null);
  const inputTvRef = useRef(null);

  return (
    <>
      <section className="row container">
        <h2 className="row__title">What's popular</h2>
        <div className="row__controls controls-row">
          <input
            ref={inputMovieRef}
            className="switcher__checkbox"
            id="io"
            type="checkbox"
          />
          <label className="switcher" htmlFor="io">
            <div
              className="switcher__trigger"
              onClick={() => {
                inputMovieRef.current.classList.remove('active');
                setMovieOrTv('movie');
              }}
            >
              In cinema
            </div>
            <div
              className="switcher__trigger"
              onClick={() => {
                inputMovieRef.current.classList.add('active');
                setMovieOrTv('tv');
              }}
            >
              On TV
            </div>
          </label>
        </div>
        <RowCards condition="popular" movieOrTv={movieOrTv}></RowCards>
      </section>
      <section className="row container">
        <h2 className="row__title">In trend</h2>
        <div className="row__controls controls-row">
          <input
            ref={inputTvRef}
            className="switcher__checkbox"
            id="oo"
            type="checkbox"
          />
          <label className="switcher" htmlFor="oo">
            <div
              className="switcher__trigger"
              onClick={() => {
                inputTvRef.current.classList.remove('active');
                setTimeTv('day');
              }}
            >
              Today
            </div>
            <div
              className="switcher__trigger"
              onClick={() => {
                inputTvRef.current.classList.add('active');
                setTimeTv('week');
              }}
            >
              This week
            </div>
          </label>
        </div>
        <RowCards time={timeTv}></RowCards>
      </section>
    </>
  );
};

export default Row;
