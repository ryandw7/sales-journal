import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registerSlice from "../pages/register/registerSlice";
import loginSlice from "../pages/login/loginSlice";
import dashboardSlice from "../pages/dashboard/dashboardSlice";
import authSlice from "../authSlice";
const rootReducer = combineReducers(
    {
       register: registerSlice,
       login: loginSlice,
       dashboard: dashboardSlice,
       auth: authSlice
    }
)
export const setUpStore = ( preloadedState ) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}