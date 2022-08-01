import React from 'react';

import {
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material';
import { CardActionArea } from '@mui/material';

import { Link } from 'react-router-dom';

const GridItem = ({ backdrop_path, id, title }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link to={`/film/${id}`}>
        <Card
          sx={{
            maxWidth: 345,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
          onClick={() => console.log(id)}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={'https://image.tmdb.org/t/p/w1280' + backdrop_path}
              alt={title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

export default GridItem;
