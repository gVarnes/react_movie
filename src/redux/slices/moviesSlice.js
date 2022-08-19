import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  totalPages: 0,
  page: 1,
};

const moviesSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setMovies, setTotalPages, setPage } = moviesSlice.actions;

export default moviesSlice.reducer;
