import gptReducer  from "./gptSlice";
import userReducer from './userSlice';
import moviesReducer from './movieSlice';
import configReducer from "./configSlice";
import loadingReducer from './loadingSlice';
import { configureStore } from "@reduxjs/toolkit";

const appStore = configureStore({
    reducer : {
        user : userReducer,
        movies : moviesReducer,
        loading : loadingReducer,
        gpt: gptReducer,
        config: configReducer
    }
})

export default appStore;