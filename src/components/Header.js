import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Container,
} from '@mui/material';

import AppButton from './AppButton';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: ' space-between' }}>
          <Typography variant="h6" component="div" sx={{ flexBasis: '120px' }}>
            News
          </Typography>
          <List
            sx={{
              // flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              flexBasis: '500px',
            }}
          >
            <ListItem>Home</ListItem>
            <ListItem>Movies</ListItem>
            <ListItem>Series</ListItem>
            <ListItem>About</ListItem>
          </List>
          <AppButton></AppButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
