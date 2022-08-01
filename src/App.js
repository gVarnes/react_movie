import React from 'react';

import { Box, Paper } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import Header from './components/Header';
import Carousel from './components/Carousel';
import MainContent from './components/MainContent/component';

const App = () => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header></Header>
      <Paper
        sx={{
          borderRadius: 0,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Carousel></Carousel>
        <MainContent></MainContent>
      </Paper>
    </Box>
  );
};

export default App;
