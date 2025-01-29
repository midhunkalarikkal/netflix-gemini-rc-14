import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    mainContainerVideoBackgroundLoading: true,
    mainContainerVideoTitleLoading: true,
    secondaryContainer: true,
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
  },
});

export const { toggleLoading, toggleMainContainerVideoBackgroundLoading, toggleMainContainerVideoTitleLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
