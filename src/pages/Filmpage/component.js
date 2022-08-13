import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CastList from '../../components/CastList';
import TrailersList from '../../components/TrailersList';

import './index.scss';

const FilmPage = () => {
  const [film, setFilm] = useState('');
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = cast.length;

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
    film && (
      <>
        <div
          className="banner"
          style={{
            backgroundImage:
              'url(https://image.tmdb.org/t/p/w1280' + film.backdrop_path,
          }}
        ></div>
        <div className="movie-content container mb-3">
          <div className="movie-content__poster">
            <div
              className="movie-content__poster-img"
              style={{
                backgroundImage:
                  'url(https://image.tmdb.org/t/p/w1280' + film.poster_path,
              }}
            ></div>
          </div>
          <div className="movie-content__info">
            <h1 className="movie-content__title">{film.title}</h1>
            <div className="movie-content__genres">
              {film.genres.map((genre, i) => (
                <span className="movie-content__genres-item" key={i}>
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="movie-content__overview">{film.overview}</div>
          </div>
          <div className="movie-content__cast cast-content">
            <h2 className="cast-content__title">Casts</h2>
            <CastList></CastList>
          </div>
        </div>
        <TrailersList></TrailersList>
      </>
    )
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
