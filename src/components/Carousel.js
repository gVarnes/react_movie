import React, { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Container } from '@mui/material';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieSlideItem from './MovieSlideItem';
import 'swiper/scss';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Carousel = () => {
  //Code From YouTube
  SwiperCore.use([Autoplay]);

  // End

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [movies, setMovies] = useState([]);
  const maxSteps = movies.length;

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=3796f44e00425ed7f9ce24e5c32086ef&page=1'
    )
      .then((data) => data.json())
      .then((res) => setMovies(res.results.slice(0, 4)));
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 3000 }}
      >
        {movies.map((movie, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              // <img
              //   src={'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path}
              // />
              <MovieSlideItem
                movie={movie}
                movieClass={`${isActive ? 'active' : ''}`}
              ></MovieSlideItem>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  // return (
  //   <Container maxWidth="md">
  //     <Box
  //       sx={{
  //         maxWidth: '100%',
  //         flexGrow: 1,
  //       }}
  //     >
  //       <Paper
  //         square
  //         elevation={0}
  //         sx={{
  //           display: 'flex',
  //           alignItems: 'center',
  //           height: 50,
  //           pl: 2,
  //           backgroundColor: theme.palette.primary.main,
  //           color: theme.palette.primary.contrastText,
  //         }}
  //       >
  //         <Typography>{activeStep + 1}</Typography>
  //       </Paper>
  //       <AutoPlaySwipeableViews
  //         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
  //         index={activeStep}
  //         onChangeIndex={handleStepChange}
  //         enableMouseEvents
  //       >
  //         {movies.map((step, index) => {
  //           return (
  //             <div key={step.title}>
  //               {Math.abs(activeStep - index) <= 2 ? (
  //                 <Box
  //                   component="img"
  //                   sx={{
  //                     height: '385px',
  //                     display: 'block',
  //                     overflow: 'hidden',
  //                     objectFit: 'cover',
  //                     width: '100%',
  //                   }}
  //                   src={
  //                     'https://image.tmdb.org/t/p/w1280' + step.backdrop_path
  //                   }
  //                   alt={step.title}
  //                 />
  //               ) : null}
  //             </div>
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

export default Carousel;
