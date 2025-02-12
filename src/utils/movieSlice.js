import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    logos: [],
    trailerVideos: [],
    selectedMovie: null,
    selectedForLarge: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      const exist = state.trailerVideos.some(
        (data) => data.movieId === action.payload.id
      );
      if (!exist) {
        state.trailerVideos.push(action.payload);
      }
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addLogo: (state, action) => {
      const exist = state.logos.some(
        (data) => data.id === action.payload.id
      );
      if (!exist) {
        state.logos.push(action.payload);
      }
    },
    addSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    addSelectedForLarge: (state, action) => {
      state.selectedForLarge = action.payload;
    },
  },
});
export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addLogo,
  addSelectedMovie,
  addSelectedForLarge,
} = movieSlice.actions;
export default movieSlice.reducer;
