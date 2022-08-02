import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const MovieSlideItem = ({ movie, movieClass }) => {
  const background = 'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path;
  return (
    <Paper
      className={`hero-slide__item ${movieClass}`}
      style={{ backgroundImage: `url(${background})`, height: '100%' }}
    >
      <Box>
        <Box>
          <Typography variant="h2">{movie.title}</Typography>
          <Typography>{movie.overview}</Typography>
          <Typography className="btns">dasdsa</Typography>
        </Box>
        <div className="hero-slide__item__contant__poster"></div>
      </Box>
    </Paper>
  );
};

export default MovieSlideItem;
