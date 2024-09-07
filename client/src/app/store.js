import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registerSlice from "../pages/register/registerSlice";
import loginSlice from "../pages/login/loginSlice";
import dashboardSlice from "../pages/dashboard/dashboardSlice";


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