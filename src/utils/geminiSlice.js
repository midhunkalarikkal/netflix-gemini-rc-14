import { createSlice } from "@reduxjs/toolkit";

const geminiSlice = createSlice({
    name: "gemini",
    initialState: {
        showGeminiSearch: false,
        movieNames : null,
        geminiMovieResults: null
    },
    reducers: {
        toggleGeminiearchView : (state) => {
            state.showGeminiSearch = !state.showGeminiSearch;
        },
        addGeminiMovieResult: (state, action) => {
            const { movieNames, geminiTmdbResults } = action.payload;
            state.movieNames = movieNames;
            state.geminiMovieResults = geminiTmdbResults;
        }
    }
});

export const { toggleGeminiearchView, addGeminiMovieResult } = geminiSlice.actions;
export default geminiSlice.reducer;