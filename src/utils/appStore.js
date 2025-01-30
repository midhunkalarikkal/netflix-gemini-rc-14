import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import loadingReducer from './loadingSlice';
import { configureStore } from "@reduxjs/toolkit";
import gptReducer  from "./gptSlice";

const appStore = configureStore({
    reducer : {
        user : userReducer,
        movies : moviesReducer,
        loading : loadingReducer,
        gpt: gptReducer,
    }
})

export default appStore;