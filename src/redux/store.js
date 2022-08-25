import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './slices/moviesSlice';
import filtersSlice from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    filters: filtersSlice,
  },
});
