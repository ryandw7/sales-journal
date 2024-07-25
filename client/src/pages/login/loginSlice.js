import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCredentials = createAsyncThunk('login/fetchCredentials', async (reqBody) => {
    try {
        const { userName, password } = reqBody;
        const res = await fetch('url', {
            method: 'GET',
            headers: {

            },
            body: JSON.stringify({
               userName,
               password
            })
        })
    } catch (err) {
        throw new Error()
    }
})
const loginSlice = createReducer({
    name: 'login',
    initialState: {
        user: {}
    },
})

export default loginSlice.reducer;