import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registerSlice from "../pages/register/registerSlice";
const rootReducer = combineReducers(
    {
       register: registerSlice
    }
)
export const setUpStore = ( preloadedState ) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}