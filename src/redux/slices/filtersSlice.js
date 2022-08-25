import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  with_genres: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addGenres: (state, action) => {
      const genreID = action.payload;
      state.with_genres.includes(genreID)
        ? (state.with_genres = state.with_genres.filter(
            (item) => item !== genreID
          ))
        : state.with_genres.push(genreID);
    },
    setFilters: (state, action) => {
      // state.with_genres.push(action.payload.with_genres);
      // state.with_genres.includes(action.payload)
      // ? {
      // 	 ...state,
      // 	 with_genres: filters.with_genres.filter(
      // 		(item) => item !== action.payload
      // 	 ),
      //   }
      // : state.with_genres.push(action.payload);
      //we need to check if our genres includes current genre id, we should delete it or we are adding id in array
      // state.with_genres.includes(action.payload)
      //   ? (state.with_genres = state.with_genres.filter(
      //       (item) => item !== action.payload
      //     ))
      //   : state.with_genres.push(action.payload);

      // console.log(
      //   action.payload.with_genres.split(',').map((item) => Number(item))
      // );
      //Main problem is that action.payload is string and we have to compare this values in other reducer but there it is a number
      //so i am mapping to write it like Number
      console.log(action.payload.with_genres);

      state.with_genres = action.payload.with_genres
        ?.split(',')
        .map((item) => Number(item));
    },
    //in header when link was clicked it refresh state
    refreshFilters: (state, action) => {
      state.with_genres = [];
    },
  },
});

export const { setFilters, addGenres, refreshFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
