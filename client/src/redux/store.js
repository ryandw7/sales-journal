import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registerSlice from "./registerSlice";
import loginSlice from "./loginSlice";
import dashboardSlice from "./dashboardSlice";


const rootReducer = combineReducers(
    {
       register: registerSlice,
       login: loginSlice,
       dashboard: dashboardSlice
       
    }
)
export const setUpStore = ( preloadedState ) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}