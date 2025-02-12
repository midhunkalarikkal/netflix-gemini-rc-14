import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
  name: "gemini",
  initialState: {
    showGeminiSearch: false,
    movieNames: null,
    geminiMovieResults: null,
    requestCount: 0,
  },
  reducers: {
    toggleGeminiearchView: (state) => {
      state.showGeminiSearch = !state.showGeminiSearch;
    },
    addGeminiMovieResult: (state, action) => {
      const { movieNames, geminiTmdbResults } = action.payload;
      state.movieNames = movieNames;
      state.geminiMovieResults = geminiTmdbResults;
    },
    addRequestCount: (state) => {
      state.requestCount += 1;
    },
    resetRequestCount: (state) => {
      state.requestCount = 0;
    },
  },
});

export const { toggleGeminiearchView, addGeminiMovieResult, addRequestCount, resetRequestCount } =
  geminiSlice.actions;
export default geminiSlice.reducer;
