import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import loadingReducer from './loadingSlice';
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
    reducer : {
        user : userReducer,
        movies : moviesReducer,
        loading : loadingReducer
    }
})

export default appStore;