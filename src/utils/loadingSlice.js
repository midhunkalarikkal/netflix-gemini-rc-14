import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    mainContainerVideoBackgroundLoading: true,
    mainContainerVideoTitleLoading: true,
    secondaryContainer: true,
    fullScreen: false,
    movieListLoading: true,
  },
  reducers: {
    toggleMainContainerVideoBackgroundLoading: (state, action) => {
      state.mainContainerVideoBackgroundLoading = action.payload;
    },
    toggleMainContainerVideoTitleLoading: (state, action) => {
      state.mainContainerVideoTitleLoading = action.payload;
    },
    toggleLoading: (state, action) => {
      state.secondaryContainer = action.payload;
    },
    toggleFullScreen: (state, action) => {
      state.fullScreen = action.payload;
    },
    toggleMovieListLoading: (state, action) => {
      state.movieListLoading = action.payload;
    }
  },
});

export const { toggleLoading, toggleMainContainerVideoBackgroundLoading, toggleMainContainerVideoTitleLoading, toggleFullScreen, toggleMovieListLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
