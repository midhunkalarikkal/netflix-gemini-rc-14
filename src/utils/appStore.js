import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import configReducer from "./configSlice";
import geminiReducer  from "./geminiSlice";
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
    reducer : {
        user : userReducer,
        movies : moviesReducer,
        gemini: geminiReducer,
        config: configReducer
    }
})

export default appStore;