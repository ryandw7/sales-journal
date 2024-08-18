import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registerSlice from "../pages/register/registerSlice";
import loginSlice from "../pages/login/loginSlice"
const rootReducer = combineReducers(
    {
       register: registerSlice,
       login: loginSlice
    }
)
export const setUpStore = ( preloadedState ) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}