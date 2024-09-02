import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { expressURL } from "./environmentals";
export const checkAuthStatus = createAsyncThunk('auth/checkIsAuth',
    async () => {
        try {
            const response = await fetch(`${expressURL}/api/auth/status`);
            const data = response.json();
            
            return data;

        } catch (err) {
            throw err
        }
    }
)

const authSlice = createSlice({  
    name: 'auth',
    initialState: {
        auth: {
            isAuthenticated: false 
        },
        authStatus: ''
    },
    extraReducers: (builder) => {
        builder
        .addCase(checkAuthStatus.pending, (state)=>{
            state.authStatus = 'pending'
        })
        .addCase(checkAuthStatus.rejected, (state)=>{
            state.authStatus = 'rejected'
        })
        .addCase(checkAuthStatus.fulfilled, (state, action) =>{
            state.authStatus = 'fulfilled',
            state.isAuthenticated = action.payload;
        })
    }
});

export const selectAuthStatus = (state) => state.auth.authStatus;

export default authSlice.reducer;