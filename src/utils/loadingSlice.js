import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    secondaryContainer: true,
  },
  reducers: {
    toggleLoading: (state, action) => {
      state.secondaryContainer = action.payload;
    },
  },
});

export const { toggleLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
