import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name : "movies",
    initialState : {
        nowPlayingMovies : null,
        trailerVideo : null,
        popularMovies : null,
        topRatedMovies : null,
        upcomingMovies : null,
        metaData : []
    },
    reducers : {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideo : (state, action) => {
            state.trailerVideo = action.payload;
        },
        addPopularMovies : (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies : (state, action) =>{
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies : (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addMetaData : (state, action) => {
            state.metaData.push(action.payload);
        }
    }
})
export const { addNowPlayingMovies , addTrailerVideo , addPopularMovies , addTopRatedMovies , addUpcomingMovies , addMetaData} = movieSlice.actions;
export default movieSlice.reducer;