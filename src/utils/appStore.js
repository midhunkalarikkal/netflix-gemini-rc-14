import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import loadingReducer from './loadingSlice';

const appStore = configureStore({
    reducer : {
        user : userReducer,
        movies : moviesReducer,
        loading : loadingReducer
    }
})

export default appStore;