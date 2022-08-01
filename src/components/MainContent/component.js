import React, { useState, useEffect } from 'react';

import {
  Box,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material';
import { Container } from '@mui/system';
import { CardActionArea } from '@mui/material';

const MainContent = () => {
  const theme = useTheme();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=3796f44e00425ed7f9ce24e5c32086ef'
    )
      .then((data) => data.json())
      .then((res) => {
        setMovies(res.results);
      });
  }, []);

  useEffect(() => {
    movies.forEach((item) => console.log(item));
  }, [movies]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={8}></Grid>
      </Grid>
      <Grid container>
        {movies.map((movie) => (
          <Grid item xs={4}>
            <Card
              sx={{
                maxWidth: 345,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
              onClick={() => console.log(movie.id)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path
                  }
                  alt={movie.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainContent;
