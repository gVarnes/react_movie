import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(0,0,0,1)',
      light: 'rgba(0,0,0,0.6)',
    },
    secondary: {
      main: blueGrey[900],
      contrastText: blueGrey[100],
    },
    buttonColor: {
      main: 'rgba(15,239,253,1)',
      light: 'rgba(255,0,245,1)',
      dark: 'rgba(0,0,0,1)',
    },
  },
});

createRoot(document.querySelector('.root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
