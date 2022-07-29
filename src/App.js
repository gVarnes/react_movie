import React from 'react';

import { AppBar, Toolbar, Typography, Box, Paper } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

import AppButton from './components/AppButton';

const App = () => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <AppButton></AppButton>
        </Toolbar>
      </AppBar>
      <Paper
        sx={{ height: '100vh', backgroundColor: theme.palette.primary.main }}
      >
        <Box sx={{ backgroundColor: 'rgba(255,255,255,.2)', color: 'white' }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi cum
          odio labore, mollitia qui reprehenderit optio laborum voluptas rerum
          similique architecto consequatur expedita eaque voluptate placeat et
          saepe. Dolores, doloribus.
        </Box>
      </Paper>
    </Box>
  );
};

export default App;
