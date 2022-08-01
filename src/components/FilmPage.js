import React, { useState, useEffect } from 'react';

import { Container } from '@mui/system';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
  Box,
  List,
  ListItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(
  ({ theme }) => `
  	// max-width: 500px;
	width: 100%;
	background: ${theme.palette.primary.dark};
	color: ${theme.palette.primary.contrastText};
	display: flex;
	align-items: center;
	padding: 20px;
  `
);

const StyledCardMedia = styled(CardMedia)(
  ({ theme }) => `
		flex: 0 1 50%;
		max-width: 300px;
	`
);

const StyledCardContent = styled(CardContent)(
  ({ theme }) => `
		flex: 1 1 auto;
		width: 100%;
	`
);

const FilmPage = () => {
  const theme = useTheme();
  const [film, setFilm] = useState([]);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/438148?api_key=3796f44e00425ed7f9ce24e5c32086ef&language=en-US`
    )
      .then((data) => data.json())
      .then((res) => {
        setFilm(res);
        setIsLoading(false);
      });
    fetch(
      'https://api.themoviedb.org/3/movie/438148/credits?api_key=3796f44e00425ed7f9ce24e5c32086ef&language=en-US'
    )
      .then((data) => data.json())
      .then((res) => setCast(res.cast));
  }, []);

  useEffect(() => {
    console.log(film);
    console.log(cast);
  }, [film]);

  return (
    <Container>
      <StyledCard>
        <StyledCardMedia>
          <CardMedia
            component="img"
            alt={film.title}
            image={'https://image.tmdb.org/t/p/w1280' + film.poster_path}
            sx={{ width: '100%' }}
          />
        </StyledCardMedia>
        <StyledCardContent>
          <Typography sx={{ fontSize: '2.5rem' }}>{film.title}</Typography>
          <Typography sx={{ fontSize: '0.8rem' }}>{film.tagline}</Typography>
          {!isLoading && (
            <List sx={{ display: 'flex' }}>
              {film.genres.map((item, index) => (
                <ListItem key={index}>{item.name}</ListItem>
              ))}
            </List>
          )}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
              variant="determinate"
              value={film.vote_average * 10}
              color="success"
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="primary.contrastText"
              >
                {`${film.vote_average * 10}%`}
              </Typography>
            </Box>
          </Box>
          <Typography>{film.overview}</Typography>
        </StyledCardContent>
      </StyledCard>
      {/* <Box component="div">{film.overview}</Box> */}
    </Container>
  );
};

export default FilmPage;
