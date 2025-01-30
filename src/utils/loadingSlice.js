import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    mainContainerVideoBackgroundLoading: true,
    mainContainerVideoTitleLoading: true,
    secondaryContainer: true,
    fullScreen: false,
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
    }
  },
});

export const { toggleLoading, toggleMainContainerVideoBackgroundLoading, toggleMainContainerVideoTitleLoading, toggleFullScreen } = loadingSlice.actions;
export default loadingSlice.reducer;
