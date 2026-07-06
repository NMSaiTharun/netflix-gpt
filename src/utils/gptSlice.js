import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "Gpt",
  initialState: {
    showGptSearch: false,
    gptMovieResults: null,
    gptMovieNames: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, tmdbResults } = action.payload;
      state.gptMovieNames = movieNames;
      state.gptMovieResults = tmdbResults;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;
