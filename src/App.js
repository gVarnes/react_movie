import React from 'react';

import { Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Header from './components/Header';
import Carousel from './components/Carousel';
import MainContent from './components/MainContent';

import { Routes, Route } from 'react-router-dom';
import FilmPage from './components/FilmPage';

const App = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100%',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Header></Header>
      <Paper
        sx={{
          borderRadius: 0,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Carousel></Carousel>
        {/* <Routes>
          <Route path="/" element={<MainContent />}></Route>
          <Route path="/film/:id" element={<FilmPage />}></Route>
        </Routes> */}
        {/* <MainContent></MainContent> */}
        <FilmPage></FilmPage>
      </Paper>
    </Box>
  );
};

export default App;
