import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EXPRESS_URL } from "../../globals";
export const fetchCredentials = createAsyncThunk('login/fetchCredentials', async (reqBody) => {
    console.log('fetching');
    try {

        const { username, password } = reqBody;
        console.log(reqBody)
        const res = await fetch(`${EXPRESS_URL}/login`, {
            method: 'POST',
            mode: "cors",
            headers: {
                
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await res.json();
        return data;
    } catch (err) {
        console.log("error thrown in catch block")
        throw err
    }
})
const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loginStatus: '',
        user: {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCredentials.rejected, (state) => {
                state.loginStatus = 'rejected';
            })
            .addCase(fetchCredentials.pending, (state) => {
                state.loginStatus = 'pending';
            })
            .addCase(fetchCredentials.fulfilled, (state, action) => {
                state.loginStatus = 'fulfilled';
                state.user = action.payload;
            })
    }
})

export const selectLoginStatus = (state) => state.login.loginStatus;
export const selectUser = (state) => state.login.user;
export default loginSlice.reducer;