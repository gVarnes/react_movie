import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
  MobileStepper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

import './filmpage.scss';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
  const { id } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = cast.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=3796f44e00425ed7f9ce24e5c32086ef&language=en-US`
    )
      .then((data) => data.json())
      .then((res) => {
        setFilm(res);
        setIsLoading(false);
      });
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3796f44e00425ed7f9ce24e5c32086ef&language=en-US`
    )
      .then((data) => data.json())
      .then((res) => setCast(res.cast));
  }, [id]);

  return (
    <div
      className="banner"
      style={{
        backgroundImage:
          'url(https://image.tmdb.org/t/p/w1280' + film.backdrop_path,
      }}
    ></div>
  );

  // return (
  //   <Container>
  //     <StyledCard>
  //       <StyledCardMedia>
  //         <CardMedia
  //           component="img"
  //           alt={film.title}
  //           image={'https://image.tmdb.org/t/p/w1280' + film.poster_path}
  //           sx={{ width: '100%' }}
  //         />
  //       </StyledCardMedia>
  //       <StyledCardContent>
  //         <Typography sx={{ fontSize: '2.5rem' }}>{film.title}</Typography>
  //         <Typography sx={{ fontSize: '0.8rem' }}>{film.tagline}</Typography>
  //         {!isLoading && (
  //           <List sx={{ display: 'flex' }}>
  //             {film.genres &&
  //               film.genres.map((item, index) => (
  //                 <ListItem key={index}>{item.name}</ListItem>
  //               ))}
  //           </List>
  //         )}
  //         <Box sx={{ position: 'relative', display: 'inline-flex' }}>
  //           <CircularProgress
  //             variant="determinate"
  //             value={film.vote_average * 10}
  //             color="success"
  //           />
  //           <Box
  //             sx={{
  //               top: 0,
  //               left: 0,
  //               bottom: 0,
  //               right: 0,
  //               position: 'absolute',
  //               display: 'flex',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //             }}
  //           >
  //             <Typography
  //               variant="caption"
  //               component="div"
  //               color="primary.contrastText"
  //             >
  //               {`${Math.round(film.vote_average * 10)}%`}
  //             </Typography>
  //           </Box>
  //         </Box>
  //         <Typography>{film.overview}</Typography>
  //       </StyledCardContent>
  //     </StyledCard>
  //     <Box>
  //       <AutoPlaySwipeableViews
  //         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
  //         index={activeStep}
  //         //  onChangeIndex={handleStepChange}
  //         containerStyle={{ width: '200px', gap: '10px' }}
  //       >
  //         {cast.map((actor, index) => {
  //           return (
  //             <Box aria-hidden={'false'} key={actor.name}>
  //               {/* {Math.abs(activeStep - index) <= 2 ? ( */}
  //               <Box
  //                 component="img"
  //                 sx={{
  //                   display: 'block',
  //                   overflow: 'hidden',
  //                   objectFit: 'contain',
  //                   width: '100%',
  //                 }}
  //                 src={'https://image.tmdb.org/t/p/w1280' + actor.profile_path}
  //                 alt={actor.name}
  //               />
  //               {/* ) : null} */}
  //             </Box>
  //           );
  //         })}
  //       </AutoPlaySwipeableViews>
  //       <MobileStepper
  //         steps={maxSteps}
  //         position="static"
  //         activeStep={activeStep}
  //         style={{
  //           backgroundColor: theme.palette.primary.main,
  //         }}
  //         nextButton={
  //           <Button
  //             size="small"
  //             onClick={handleNext}
  //             disabled={activeStep === maxSteps - 1}
  //             sx={{
  //               color: theme.palette.primary.contrastText,
  //             }}
  //           >
  //             Next
  //             {theme.direction === 'rtl' ? (
  //               <KeyboardArrowLeft />
  //             ) : (
  //               <KeyboardArrowRight />
  //             )}
  //           </Button>
  //         }
  //         backButton={
  //           <Button
  //             size="small"
  //             onClick={handleBack}
  //             disabled={activeStep === 0}
  //             sx={{
  //               color: theme.palette.primary.contrastText,
  //             }}
  //           >
  //             {theme.direction === 'rtl' ? (
  //               <KeyboardArrowRight />
  //             ) : (
  //               <KeyboardArrowLeft />
  //             )}
  //             Back
  //           </Button>
  //         }
  //       />
  //     </Box>
  //   </Container>
  // );
};

export default FilmPage;
