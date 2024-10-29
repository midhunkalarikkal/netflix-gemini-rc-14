import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name : "movies",
    initialState : {
        nowPlayingMovies : null,
        trailerVideo : [],
        popularMovies : null,
        topRatedMovies : null,
        upcomingMovies : null,
        metaData : [],
    },
    reducers : {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideo : (state, action) => {
            const exist = state.trailerVideo.some((data) => data.movieId === action.payload.movieId);
            if(!exist){
                state.trailerVideo.push(action.payload);
            }
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
            const exist = state.metaData.some((data) => data.id === action.payload.id);
            if(!exist){
                state.metaData.push(action.payload);
            }
        },
    }
})
export const { addNowPlayingMovies , addTrailerVideo , addPopularMovies , addTopRatedMovies , addUpcomingMovies , addMetaData} = movieSlice.actions;
export default movieSlice.reducer;