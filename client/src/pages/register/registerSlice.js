import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { EXPRESS_URL } from "../../globals";

export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (reqBody) => {
        const { firstName, lastName, userName, password } = reqBody;

        try {
            const res = await fetch(`${EXPRESS_URL}/register`, {
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json'
                     // Make sure to set Content-Type
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    userName,
                    password
                })
            });
            
            const data = await res.json();
            return data;

        } catch (error) {
            throw new Error('Missing body info');
        }
    }
)
const registerSlice = createSlice({
    name: 'register',
    initialState: {
        registerStatus: '',
        registeredUser: ''
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.rejected, (state, action) => {
                state.registerStatus = 'rejected';
            })
            .addCase(registerUser.pending, (state) => {
                state.registerStatus = 'pending';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.registerStatus = 'fulfilled';
                state.registeredUser = action.payload;
            })
    }
});

export const selectRegisterStatus = (state) => state.register.registerStatus;
export default registerSlice.reducer;