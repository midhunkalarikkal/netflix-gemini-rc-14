import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
    },
    reducers: {
        toggleGptSearchView : (state) => {
            state.showGptSearch = !state.showGptSearch;
        }
    }
});

export const { toggleGptSearchView } = geminiSlice.actions;
export default geminiSlice.reducer;