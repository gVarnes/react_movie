import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  with_genres: [],
  sort_by: {
    name: 'Popularity Descending',
    sortProperty: 'popularity.desc',
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addGenres: (state, action) => {
      const genreID = action.payload;
      //we need to check if our genres includes current genre id, we should delete it or we are adding id in array
      state.with_genres.includes(genreID)
        ? (state.with_genres = state.with_genres.filter(
            (item) => item !== genreID
          ))
        : state.with_genres.push(genreID);
    },
    addSort: (state, action) => {
      state.sort_by = action.payload;
    },
    setFilters: (state, action) => {
      state.with_genres = action.payload.with_genres;
      state.sort_by = action.payload.sort_by;
    },
    //in header when link was clicked it refresh state
    refreshFilters: (state, action) => {
      state.with_genres = [];
      state.sort_by = {
        name: 'Popularity Descending',
        sortProperty: 'popularity.desc',
      };
    },
  },
});

export const { addGenres, addSort, setFilters, refreshFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
